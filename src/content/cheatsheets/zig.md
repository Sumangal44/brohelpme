---
title: Zig
date: 2024-01-15 10:00:00
background: bg-[#f7a41d]
tags:
  - zig
  - systems
  - compiler
  - low-level
  - c-replacement
categories:
  - Programming
intro: |
  A comprehensive quick reference cheat sheet for the Zig programming language covering installation, syntax, pointers, memory allocators, comptime, C interoperability, and the build system.
plugins:
  - copyCode
---

## Getting Started

### Installation {.col-span-2}

Download pre-built tarballs from [ziglang.org/download](https://ziglang.org/download/) or use your system package manager:

```bash
# macOS (Homebrew)
$ brew install zig

# Linux (Arch / Ubuntu / Snap)
$ pacman -S zig
$ sudo snap install zig --classic --beta

# Windows (Scoop / Chocolatey / Winget)
$ scoop install zig
$ choco install zig
$ winget install zig.zig

# Verify installation
$ zig version
```

Direct binary download (Linux / macOS / Windows tarball):
```bash
# Extract and add to PATH
$ tar -xf zig-linux-x86_64-0.13.0.tar.xz
$ export PATH="$PATH:/path/to/zig-linux-x86_64-0.13.0"
```

Verify signature with `minisign`:
```bash
$ minisign -Vm zig-linux-x86_64-0.13.0.tar.xz -P RWSGOq2NylR2ysXzsAzwPS8mAnoopMWgu1+LoO5cqzSmUi3CaGQv2TX5
```

### Hello World {.row-span-2}

Save as `hello.zig`:

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, {s}!\n", .{"World"});
}
```

Run directly without saving an artifact:

```bash
$ zig run hello.zig
Hello, World!
```

Compile into an executable:

```bash
$ zig build-exe hello.zig
$ ./hello
```

### CLI Toolchain {.col-span-2}

| Command | Description |
| --- | --- |
| `zig run <file.zig>` | Build and run a Zig program in one step |
| `zig build-exe <file.zig>` | Compile a standalone executable |
| `zig build-lib <file.zig>` | Compile a static or shared library |
| `zig build-obj <file.zig>` | Compile an object file (`.o`) |
| `zig test <file.zig>` | Run built-in unit tests |
| `zig init` | Initialize a new `build.zig` project |
| `zig build` | Run the project build system |
| `zig build run` | Build and run the project executable |
| `zig build test` | Execute all test suites configured in `build.zig` |
| `zig fmt <file.zig>` | Format source files in-place according to style guidelines |
| `zig cc [args]` | Drop-in C compiler (Clang frontend, Zig toolchain) |
| `zig c++ [args]` | Drop-in C++ compiler |
| `zig translate-c <file.h>` | Translate C header or source code into Zig syntax |
| `zig targets` | List all supported CPU targets, OSes, and ABIs |
| `zig env` | Print Zig compilation environment variables and paths |
| `zig fetch --save <url>` | Add a dependency package to `build.zig.zon` |

### Optimization Modes

| Mode | Flag | Safety | Optimizations | Speed | Binary Size |
| --- | --- | --- | --- | --- | --- |
| **Debug** | `-O Debug` (default) | On | Off | Normal | Large |
| **ReleaseSafe** | `-O ReleaseSafe` | On | Medium | Fast | Medium |
| **ReleaseFast** | `-O ReleaseFast` | Off | Maximum | Fastest | Small |
| **ReleaseSmall** | `-O ReleaseSmall` | Off | Size-focused | Fast | Smallest |

```bash
# Build executable with ReleaseFast optimizations
$ zig build-exe -O ReleaseFast main.zig
```

---

## Language Basics

### Variables and Constants

```zig
const std = @import("std");

// Constants are immutable (prefer const over var)
const max_users: u32 = 1000;
const app_name = "BroHelp"; // Type inferred as *const [7:0]u8

// Variables are mutable
var current_count: u32 = 0;
current_count += 1;

// Undefined variables (must specify type explicitly)
var buffer: [1024]u8 = undefined;

// Discarding unused values (silences compiler error)
_ = max_users;
```

### Primitive Types {.col-span-2}

| Category | Types | Description |
| --- | --- | --- |
| **Unsigned Int** | `u8`, `u16`, `u32`, `u64`, `u128`, `usize` | Fixed-size unsigned integers (`usize` is pointer-sized) |
| **Signed Int** | `i8`, `i16`, `i32`, `i64`, `i128`, `isize` | Two's-complement signed integers |
| **Arbitrary Int** | `u1` ... `u65535`, `i1` ... `i65535` | Custom bit-width integers (e.g. `u3`, `i24`, `u7`) |
| **Floats** | `f16`, `f32`, `f64`, `f80`, `f128` | IEEE-754 floating point numbers |
| **Boolean** | `bool` | `true` or `false` |
| **Void** | `void` | Zero-sized type holding no information |
| **No Return** | `noreturn` | Bottom type for functions that never return (e.g., `panic`, `exit`) |
| **Type** | `type` | First-class compile-time type value |
| **Comptime Int** | `comptime_int` | Arbitrary-precision integer evaluated at compile time |
| **Comptime Float**| `comptime_float` | Arbitrary-precision float evaluated at compile time |

### Arrays

Fixed-size contiguous buffers:

```zig
// Explicit length and type
const numbers: [5]i32 = [5]i32{ 1, 2, 3, 4, 5 };

// Inferred length with [_]
const primes = [_]i32{ 2, 3, 5, 7, 11, 13 };
const len = primes.len; // 6

// Multidimensional arrays
const matrix = [2][3]u8{
    [_]u8{ 1, 2, 3 },
    [_]u8{ 4, 5, 6 },
};

// Array repetition operator **
const zeros = [_]u8{0} ** 64; // Array of 64 zero bytes
const pattern = [_]u8{ 1, 2 } ** 3; // { 1, 2, 1, 2, 1, 2 }

// Array concatenation ++ (comptime only)
const combined = primes ++ [_]i32{ 17, 19 };
```

### Slices

Fat pointers with a pointer and length (`len`):

```zig
const array = [_]i32{ 10, 20, 30, 40, 50 };

// Slicing an array: [start..end] (end is exclusive)
const slice: []const i32 = array[1..4]; // Elements { 20, 30, 40 }
const count = slice.len;              // 3
const first = slice[0];                // 20

// Mutable slice from a mutable array
var mut_array = [_]i32{ 1, 2, 3 };
const mut_slice: []i32 = mut_array[0..];
mut_slice[0] = 99;
```

### Strings

In Zig, strings are UTF-8 byte arrays / slices (`[]const u8`):

```zig
const std = @import("std");

// String literal is a null-terminated array pointer
const msg: [:0]const u8 = "Hello, Zig!";

// Normal string slice
const str: []const u8 = "BroHelp.Me";
const length: usize = str.len;

// Multi-line string literal (starts with \\)
const banner =
    \\==============================
    \\   Welcome to BroHelp.Me
    \\==============================
;

// Byte character literals
const char_a: u8 = 'A';
const newline: u8 = '\n';
```

---

## Control Flow

### If Expressions

`if` statements are expressions and return values:

```zig
const score: u32 = 85;

// If-else expression
const grade = if (score >= 90) "A" else if (score >= 80) "B" else "C";

// Optional unwrapping with if
var optional_name: ?[]const u8 = "Alice";
if (optional_name) |name| {
    std.debug.print("User: {s}\n", .{name});
} else {
    std.debug.print("Anonymous\n", .{});
}

// Error union unwrapping with if
const result: anyerror!u32 = 42;
if (result) |value| {
    std.debug.print("Success: {}\n", .{value});
} else |err| {
    std.debug.print("Error: {}\n", .{err});
}
```

### Switch Statements {.col-span-2}

`switch` is exhaustive and works as an expression:

```zig
const std = @import("std");

const code: u32 = 3;
const label = switch (code) {
    0 => "zero",
    1 => "one",
    2, 3, 5, 7 => "prime under 10",
    8...15 => "byte high nibble",
    else => "unknown",
};

// Switching over enums without repeating the type name
const Color = enum { red, green, blue };
const c: Color = .green;

switch (c) {
    .red => std.debug.print("Hot\n", .{}),
    .green, .blue => std.debug.print("Cool\n", .{}),
}
```

### While Loops

```zig
// Standard while loop
var i: usize = 0;
while (i < 5) {
    i += 1;
}

// While with continue expression (executed on every iteration)
var j: usize = 0;
while (j < 10) : (j += 1) {
    if (j == 5) continue;
    if (j == 8) break;
}

// While with optional unwrapping
var iterator = getNextItem();
while (iterator) |item| : (iterator = getNextItem()) {
    std.debug.print("Item: {}\n", .{item});
}

// While with else (executes if condition becomes false without break)
var search_idx: usize = 0;
const found = while (search_idx < 10) : (search_idx += 1) {
    if (items[search_idx] == target) break true;
} else false;
```

### For Loops

```zig
const items = [_]u32{ 10, 20, 30, 40 };

// Iterate by value
for (items) |val| {
    std.debug.print("{}\n", .{val});
}

// Iterate with index (0..)
for (items, 0..) |val, idx| {
    std.debug.print("items[{}] = {}\n", .{ idx, val });
}

// Multi-array simultaneous iteration
const a = [_]u8{ 'a', 'b', 'c' };
const b = [_]u8{ 1, 2, 3 };
for (a, b) |char, num| {
    std.debug.print("{c}: {}\n", .{ char, num });
}

// By-reference iteration (to mutate array elements)
var mutable_items = [_]i32{ 1, 2, 3 };
for (&mutable_items) |*val| {
    val.* *= 10; // mutable_items is now { 10, 20, 30 }
}
```

### Defer and Errdefer

```zig
const std = @import("std");

fn processFile(allocator: std.mem.Allocator) !void {
    const buffer = try allocator.alloc(u8, 1024);
    // defer runs whenever current scope exits (LIFO order)
    defer allocator.free(buffer);

    // errdefer only runs if function exits with an error
    var res = try acquireResource();
    errdefer res.release();

    try riskyOperation();
}
```

---

## Functions & Error Handling

### Function Declarations

```zig
// Functions parameters are immutable constants
fn add(a: i32, b: i32) i32 {
    return a + b;
}

// Public function returning void
pub fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\n", .{name});
}

// Discarding return value explicitly
_ = add(5, 10);

// Recursion is supported
fn factorial(n: u64) u64 {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

### Error Sets and Error Unions {.col-span-2}

Zig treats errors as typed values instead of hidden exceptions:

```zig
// Defining an error set
const FileError = error{
    NotFound,
    AccessDenied,
    DiskFull,
};

// Error union type: ErrorSet!Payload
fn parseNumber(str: []const u8) FileError!u32 {
    if (str.len == 0) return FileError.NotFound;
    return 42;
}

// The 'anyerror' open error set
fn openConfig() anyerror!void {
    // Can return any error
}
```

### Catch and Try

```zig
// try propagates the error to the caller (syntactic sugar for catch |err| return err)
fn loadData() !u32 {
    const num = try parseNumber("123");
    return num * 2;
}

// catch provides a fallback value
const port = parsePort("8080") catch 80;

// catch with an error payload block
const config = openFile("config.json") catch |err| switch (err) {
    error.NotFound => createDefaultConfig(),
    error.AccessDenied => return error.PermissionError,
    else => return err,
};
```

---

## Pointers & Memory

### Pointer Types {.col-span-2}

| Syntax | Kind | Size | Operations | Nullable? | Bounds Checked? |
| --- | --- | --- | --- | --- | --- |
| `*T` | Single-item pointer | 1 usize | Dereference (`ptr.*`) | No | N/A (1 item) |
| `[*]T` | Many-item pointer | 1 usize | Index (`ptr[i]`), arithmetic (`ptr + 1`) | No | No (raw pointer) |
| `[]T` | Slice (fat pointer) | 2 usize | Indexing, slicing, `.len`, `.ptr` | No | Yes |
| `[*c]T` | C-compatible pointer | 1 usize | Supports NULL, arithmetic, indexing | Yes | No |
| `?*T` | Optional pointer | 1 usize | Nullable single-item pointer (zero-cost) | Yes | N/A |
| `*const T` | Const pointer | 1 usize | Read-only dereference | No | N/A |

### Pointer Syntax

```zig
var x: i32 = 42;

// Address-of operator &
const ptr: *i32 = &x;

// Dereference operator .*
ptr.* = 100;
std.debug.print("x is {}\n", .{x}); // 100

// Constant pointer (cannot modify pointee)
const c_ptr: *const i32 = &x;

// Optional pointer (guaranteed zero-overhead null pointer optimization)
var opt_ptr: ?*i32 = null;
opt_ptr = &x;

if (opt_ptr) |p| {
    p.* += 1;
}
```

### Optionals

```zig
// ?T denotes an optional type (value or null)
var home_dir: ?[]const u8 = null;
home_dir = "/home/user";

// orelse provides a fallback if null
const dir = home_dir orelse "/tmp";

// Unwrapping with .? (panics in Debug/ReleaseSafe if null)
const unwrapped = home_dir.?;

// Conditional unwrapping with if
if (home_dir) |h| {
    std.debug.print("Home: {s}\n", .{h});
}
```

---

## Structs, Enums & Unions

### Structs

```zig
const std = @import("std");

pub const User = struct {
    id: u64,
    name: []const u8,
    is_active: bool = true, // Default field value

    // Method with value self
    pub fn printInfo(self: User) void {
        std.debug.print("User {}: {s} (active: {})\n", .{ self.id, self.name, self.is_active });
    }

    // Method with pointer self (can mutate)
    pub fn deactivate(self: *User) void {
        self.is_active = false;
    }
};

// Instantiation
var user1 = User{
    .id = 1,
    .name = "Alice",
};
user1.printInfo();
user1.deactivate();
```

### Packed and Extern Structs

```zig
// packed struct guarantees exact bit layout (useful for bitfields & hardware)
const Flags = packed struct {
    read: bool,
    write: bool,
    execute: bool,
    reserved: u5 = 0,
};

// extern struct matches C ABI structure layout
const CHeader = extern struct {
    magic: u32,
    size: u64,
};
```

### Enums

```zig
// Enums with explicit integer backing type
const HttpMethod = enum(u8) {
    GET = 1,
    POST = 2,
    PUT = 3,
    DELETE = 4,

    pub fn isSafe(self: HttpMethod) bool {
        return self == .GET;
    }
};

// Accessing enum tag
const method: HttpMethod = .POST;
const raw_tag: u8 = @intFromEnum(method); // 2
```

### Tagged Unions {.col-span-2}

Unions that store a payload along with a tag indicating which field is active:

```zig
const std = @import("std");

const Payload = union(enum) {
    none,
    int_val: i64,
    float_val: f64,
    text: []const u8,
};

pub fn inspect(p: Payload) void {
    switch (p) {
        .none => std.debug.print("Nothing\n", .{}),
        .int_val => |i| std.debug.print("Integer: {}\n", .{i}),
        .float_val => |f| std.debug.print("Float: {d:.2}\n", .{f}),
        .text => |s| std.debug.print("Text: {s}\n", .{s}),
    }
}
```

---

## Memory Allocators

### Allocator Types {.col-span-2}

| Allocator | Standard Usage | Speed | Cleanup |
| --- | --- | --- | --- |
| `std.heap.GeneralPurposeAllocator` (GPA) | Safe standard heap allocator; detects memory leaks & double-frees | Good | Per-allocation with `free` |
| `std.heap.page_allocator` | Directly asks the OS kernel for virtual memory pages | Slow | Per-allocation with `free` |
| `std.heap.ArenaAllocator` | Wraps another allocator; frees all allocations at once via `deinit()` | Very Fast | Single `arena.deinit()` |
| `std.heap.FixedBufferAllocator` | Allocates out of a fixed-size stack or global byte buffer; zero heap calls | Fastest | Reset buffer or scoped |
| `std.heap.c_allocator` | Uses system libc `malloc` / `free` (requires linking libc) | Fast | Per-allocation with `free` |
| `std.testing.allocator` | Unit test allocator; automatically fails test if memory is leaked | Good | Automatically checked |

### GPA and Arena Pattern

```zig
const std = @import("std");

pub fn main() !void {
    // GeneralPurposeAllocator setup
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer {
        const deinit_status = gpa.deinit();
        if (deinit_status == .leak) @panic("Memory leak detected!");
    }
    const allocator = gpa.allocator();

    // Allocate a slice of 100 integers
    const numbers = try allocator.alloc(i32, 100);
    defer allocator.free(numbers);

    // Arena allocator pattern (bulk cleanup)
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit(); // Frees EVERYTHING allocated in this arena
    const arena_allocator = arena.allocator();

    const title = try arena_allocator.dupe(u8, "BroHelpMe Platform");
    _ = title;
}
```

---

## Standard Library Data Structures

### std.ArrayList

Dynamic resizable array (analogous to `std::vector` in C++ or `Vec` in Rust):

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();

    try list.append(10);
    try list.append(20);
    try list.appendSlice(&[_]u32{ 30, 40, 50 });

    const total_items = list.items.len; // 5
    const second = list.items[1];        // 20
    const popped = list.pop();           // 50
    _ = total_items; _ = second; _ = popped;
}
```

### std.AutoHashMap

Fast hash table for arbitrary keys and values:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Map from u32 to string slice
    var map = std.AutoHashMap(u32, []const u8).init(allocator);
    defer map.deinit();

    try map.put(200, "OK");
    try map.put(404, "Not Found");
    try map.put(500, "Internal Server Error");

    if (map.get(200)) |status_text| {
        std.debug.print("200 is {s}\n", .{status_text});
    }

    _ = map.remove(500);
}
```

---

## I/O, Filesystem & Formatting

### Console Output & Formatting

```zig
const std = @import("std");

pub fn main() !void {
    // Unbuffered debug print to stderr (thread-safe, does not allocate)
    std.debug.print("Decimal: {d}, Hex: 0x{x}, String: {s}\n", .{ 42, 255, "Zig" });

    // Writing to standard output (buffered)
    const stdout = std.io.getStdOut().writer();
    var bw = std.io.bufferedWriter(stdout);
    const writer = bw.writer();

    try writer.print("Formatted output: {d:.2}\n", .{3.14159});
    try bw.flush(); // Don't forget to flush buffered writers!
}
```

### File Operations

```zig
const std = @import("std");

pub fn fileDemo(allocator: std.mem.Allocator) !void {
    const cwd = std.fs.cwd();

    // Writing to a file
    const file = try cwd.createFile("notes.txt", .{ .read = true });
    defer file.close();
    try file.writeAll("Hello from BroHelpMe!\n");

    // Reading file contents into an allocated buffer
    const content = try cwd.readFileAlloc(allocator, "notes.txt", 1024 * 1024);
    defer allocator.free(content);
    std.debug.print("File content: {s}", .{content});

    // Delete file
    try cwd.deleteFile("notes.txt");
}
```

---

## Comptime & Generics

### Compile-time Execution

`comptime` expressions run at compile time:

```zig
const std = @import("std");

fn fibonacci(comptime n: u32) u64 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() void {
    // Evaluated entirely by compiler at compile time
    const result = comptime fibonacci(10);
    std.debug.print("Fib(10) = {}\n", .{result});
}
```

### Generic Data Structures {.col-span-2}

In Zig, generic types are functions that take `comptime type` and return a `type`:

```zig
const std = @import("std");

fn Stack(comptime T: type, comptime capacity: usize) type {
    return struct {
        items: [capacity]T = undefined,
        count: usize = 0,

        const Self = @This();

        pub fn push(self: *Self, item: T) !void {
            if (self.count >= capacity) return error.StackOverflow;
            self.items[self.count] = item;
            self.count += 1;
        }

        pub fn pop(self: *Self) ?T {
            if (self.count == 0) return null;
            self.count -= 1;
            return self.items[self.count];
        }
    };
}

pub fn main() !void {
    var int_stack = Stack(i32, 10){};
    try int_stack.push(100);
    const top = int_stack.pop();
    _ = top;
}
```

---

## C Interoperability

### Calling C from Zig

Zig can import and compile C header files directly:

```zig
const std = @import("std");

// Import C headers
const c = @cImport({
    @cInclude("stdio.h");
    @cInclude("stdlib.h");
    @cInclude("math.h");
});

pub fn main() void {
    _ = c.printf("Hello from C printf: %f\n", c.sqrt(16.0));
}
```

Compile and link with standard C library:
```bash
$ zig run -lc main.zig
```

### Exporting Zig Functions to C

```zig
// Export function with C calling convention and ABI compatibility
export fn add_numbers(a: c_int, b: c_int) c_int {
    return a + b;
}
```

### Zig as a C/C++ Compiler {.col-span-2}

Zig is a complete, drop-in replacement for `gcc` and `clang` with cross-compilation built-in:

```bash
# Compile a C program
$ zig cc -O3 -o hello hello.c

# Compile a C++ program
$ zig c++ -O3 -o app main.cpp

# Cross-compile a C program for Windows x86_64 from macOS/Linux
$ zig cc -target x86_64-windows hello.c -o hello.exe

# Cross-compile for Linux musl (fully static standalone binary)
$ zig cc -target x86_64-linux-musl -static server.c -o server

# Cross-compile for Raspberry Pi / ARM Linux
$ zig cc -target aarch64-linux-gnu app.c -o app
```

---

## Unit Testing

### Writing Tests

Tests are first-class language constructs:

```zig
const std = @import("std");
const expect = std.testing.expect;
const expectEqual = std.testing.expectEqual;

fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "basic math assertion" {
    try expect(add(2, 3) == 5);
    try expectEqual(@as(i32, 5), add(2, 3));
}

test "testing memory allocator" {
    // std.testing.allocator fails the test if any memory leaks occur
    const slice = try std.testing.allocator.alloc(u8, 64);
    defer std.testing.allocator.free(slice);

    try expect(slice.len == 64);
}
```

Run tests with:
```bash
$ zig test math_test.zig
1/2 test "basic math assertion"... OK
2/2 test "testing memory allocator"... OK
All 2 tests passed.
```

---

## Build System

### build.zig Project Configuration {.col-span-2}

Zig uses pure Zig code for configuring its build system instead of Makefiles, CMake, or XML:

```zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    // Standard target queries and optimization options
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Create executable artifact
    const exe = b.addExecutable(.{
        .name = "my_app",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    b.installArtifact(exe);

    // Add 'zig build run' step
    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run_cmd.step);

    // Add 'zig build test' step
    const unit_tests = b.addTest(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    const run_unit_tests = b.addRunArtifact(unit_tests);
    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_unit_tests.step);
}
```

### build.zig.zon Package Manifest

Zig Object Notation manifest for package dependencies:

```zig
.{
    .name = "my_app",
    .version = "0.1.0",
    .minimum_zig_version = "0.13.0",
    .dependencies = .{
        // Add dependencies via: zig fetch --save <tarball-url-or-git>
    },
    .paths = .{
        "build.zig",
        "build.zig.zon",
        "src",
        "LICENSE",
        "README.md",
    },
}
```
