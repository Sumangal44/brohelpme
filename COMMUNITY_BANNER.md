# 🌟 Community Open Source Spotlight & Banner Feature

BroHelpMe offers **100% free community showcase banners** for developers, open-source projects, CLI tools, libraries, and indie dev products.

No ad trackers, no payment required. Anyone can submit their project via a simple GitHub Pull Request. Once approved and merged, your project will be featured in the spotlight banner across the website!

---

## 📋 Guidelines & Requirements

To keep the spotlight high quality and useful for developers:

1. **Relevance**: Must be a developer tool, open-source software, library, framework, CLI, API, or programming resource.
2. **Security**: The website URL **must** use HTTPS (`https://...`).
3. **No Spam or Malicious Content**: No affiliate links, gambling, adult content, or closed paywalls without free developer tiers.
4. **Character Limits**:
   - `title`: 2 to 40 characters
   - `tagline`: 10 to 120 characters
   - `badge`: e.g., `"Open Source"`, `"Dev Tool"`, `"CLI"`, `"Library"` (max 20 characters)
   - `ctaText`: e.g., `"Explore Docs"`, `"Star on GitHub"`, `"Learn More"` (max 25 characters)

---

## 🚀 How to Add Your Project (Step-by-Step)

### Step 1: Fork and Clone the Repository

```bash
git clone https://github.com/<your-username>/brohelpme.git
cd brohelpme
```

### Step 2: Create a Feature Branch

```bash
git checkout -b banner/<your-project-name>
```

### Step 3: Add Your Entry to `src/data/community-banners.json`

Open [`src/data/community-banners.json`](./src/data/community-banners.json) and append your entry to the list:

```json
{
	"id": "my-tool",
	"title": "My Tool",
	"tagline": "A lightning-fast CLI utility for automated Docker deployments.",
	"url": "https://mytool.dev",
	"badge": "CLI Tool",
	"ctaText": "Try My Tool",
	"active": true
}
```

### Step 4: Verify Your Entry

Run the validation script to ensure formatting and schema match:

```bash
bun test:banner
```

### Step 5: Commit and Submit a Pull Request

```bash
git add src/data/community-banners.json
git commit -m "feat(banner): add My Tool to community showcase"
git push origin banner/<your-project-name>
```

Open a Pull Request on GitHub. Once merged, your banner will automatically rotate on BroHelpMe!
