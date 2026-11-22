# Security Policy

The **BroHelpMe** team takes the security of our project, website, and community seriously. We appreciate the efforts of security researchers and community members who help keep BroHelpMe safe and secure for developers worldwide.

---

## Supported Versions

BroHelpMe is a continuously deployed static web application built with Astro and Svelte. Security fixes and patches are applied directly to the active `main` branch and deployed to production.

| Version / Branch | Supported          | Status                                       |
| ---------------- | ------------------ | -------------------------------------------- |
| `main` (latest)  | :white_check_mark: | Actively supported with security fixes       |
| `< 0.0.2` (tags) | :x:                | Historical versions; update to latest `main` |

---

## Reporting a Vulnerability

If you discover a security vulnerability or potential exploit within BroHelpMe, **please do not disclose it publicly via GitHub issues, discussions, or social media.** Publicly disclosing vulnerabilities before a fix is available puts users and contributors at risk.

Instead, please report vulnerabilities using one of the following secure channels:

### 1. GitHub Private Vulnerability Reporting (Preferred)

You can report vulnerabilities privately and directly through GitHub's Security Advisories feature:

1. Navigate to the [BroHelpMe Security tab](https://github.com/Sumangal44/brohelpme/security).
2. Click **Advisories** → **[Report a vulnerability](https://github.com/Sumangal44/brohelpme/security/advisories/new)**.
3. Fill out the report form with full reproduction details.

### 2. Email Contact

If you cannot submit a GitHub Security Advisory, you can reach out via email:

- **Contact**: `sumangalkaran44@gmail.com`
- **Subject Line**: `[SECURITY] BroHelpMe Vulnerability Report - <Brief Description>`

---

## What to Include in Your Report

To help us investigate, triage, and resolve the issue quickly, please include as much of the following information as possible:

- **Description**: A clear summary of the issue and its potential impact.
- **Affected Components**: Specific files, pages, dependencies, API integrations, or GitHub Actions workflows affected.
- **Reproduction Steps**: Step-by-step instructions, payloads, or a minimal Proof of Concept (PoC) demonstrating the vulnerability.
- **Environment**: Browser name and version, operating system, and Node/Bun version if running locally.
- **Proposed Mitigation**: If you have identified a potential fix or patch, please share your suggestion.

---

## Response & Disclosure Process

When a vulnerability report is received, we adhere to the following response timeline:

1. **Acknowledgment**: We will acknowledge receipt of your report within **48 hours**.
2. **Assessment & Triage**: Within **5 business days**, we will review and reproduce the issue, assess its severity, and determine the appropriate fix.
3. **Fix Development**: We will develop and test a patch privately (e.g., in a private fork or GitHub Advisory workspace).
4. **Deployment & Release**: Once validated, the fix will be merged into `main` and immediately deployed to production.
5. **Public Disclosure**: A public security advisory or changelog entry will be published, giving credit to the researcher (unless you prefer to remain anonymous).

---

## Scope & Guidelines

### In Scope

- Cross-Site Scripting (XSS) in Markdown rendering, Markdoc processing, or Svelte component logic.
- Vulnerabilities in search indexing, URL parameter sanitization, or client-side storage handling.
- GitHub Actions workflow security (e.g., script injection, untrusted PR execution, secret leakage).
- Severe known vulnerabilities in runtime dependencies with demonstrable exploit paths.
- Content injection or manipulation in community banner and cheatsheet loaders.

### Out of Scope

- Denial of Service (DoS / DDoS) attacks against hosting infrastructure (e.g., Netlify CDN).
- Attacks requiring physical access to a user's unlocked device or compromised browser extensions.
- Theoretical vulnerabilities without a working Proof of Concept.
- Spam, social engineering, or phishing targeting maintainers.
- Automated vulnerability scanner reports without demonstrated impact.

---

## Safe Harbor

We consider security research conducted under this policy to be authorized. We will not pursue legal action against researchers who:

- Make a good-faith effort to avoid privacy violations, destruction of data, and service interruption.
- Give us reasonable time to investigate and resolve an issue before making any public disclosure.
- Act in accordance with applicable laws and ethical disclosure practices.

Thank you for helping keep BroHelpMe safe and secure!
