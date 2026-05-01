---
title: How To Secure Nginx with Let's Encrypt on Ubuntu
cover: /Terminal-screen-typing-command-line-202605011846.jpeg
description: "POV: your website is serving plain HTTP in 2026. That's not just cooked — that's a security incident waiting to happen."
draft: false
featured: true
navigation:
  description: "POV: your website is serving plain HTTP in 2026. That's not just cooked — that's a security incident waiting to happen."
  title: How To Secure Nginx with Let's Encrypt on Ubuntu file
publishedAt: 2026-05-01 18:44:00
readTime: 5
seo:
  title: How To Secure Nginx with Let's Encrypt on Ubuntu file
  description: "POV: your website is serving plain HTTP in 2026. That's not just cooked — that's a security incident waiting to happen."
tags:
  - ssl
  - ubuntu
  - certbot
updatedAt: 2026-05-01 18:44:00
---

POV: your website is serving plain HTTP in 2026. That's not just cooked — that's a security incident waiting to happen.

The good news? Getting a free, legit SSL certificate slapped onto your Nginx server takes less than 10 minutes. Here's how to do it using **Let's Encrypt + Certbot** on Ubuntu.

---

## What Even Is This Setup?

**Let's Encrypt** is a free Certificate Authority (CA) that hands out TLS/SSL certificates so your site can run on HTTPS. The tool you'll actually be typing into your terminal is **Certbot** — it automates almost everything: getting the cert, configuring Nginx, and setting up auto-renewal.

---

## Before You Start

Make sure you have these locked in or this whole thing falls apart:

- An Ubuntu server with a `sudo`-enabled non-root user and a firewall active
- A **registered domain name** (e.g. `example.com`) with DNS A records pointing to your server's public IP — both `example.com` and `www.example.com`
- **Nginx already installed** with a server block configured for your domain at `/etc/nginx/sites-available/example.com`

---

## Step 1 — Install Certbot

The Certbot team recommends the **snap** package. Run these in order:

```bash
sudo snap install core; sudo snap refresh core
sudo apt remove certbot        # clean up any old version first
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

No `snapd` on your system? There's an APT fallback:

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

---

## Step 2 — Check Your Nginx Config

Certbot finds your domain by scanning for the `server_name` directive in your Nginx config. Open the file:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Make sure this line is in there:

```nginx
server_name example.com www.example.com;
```

If you had to edit it, test and reload Nginx before moving on:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 3 — Open the Firewall for HTTPS

Your `ufw` firewall is probably only letting HTTP through. Fix that:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Verify with `sudo ufw status` — you should see `Nginx Full` listed and `Nginx HTTP` gone.

---

## Step 4 — Get the Certificate

One command. That's it:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will ask for your email and ToS agreement, then handle everything — downloading the cert, updating your Nginx config, and setting up HTTPS redirects. When it's done, your site gets an **A grade** on SSL Labs automatically.

Need to cover multiple subdomains? Just stack the `-d` flags:

```bash
sudo certbot --nginx -d example.com -d www.example.com -d api.example.com
```

---

## Step 5 — Verify Auto-Renewal

Let's Encrypt certs expire every **90 days**, but Certbot sets up a systemd timer that renews them automatically — running twice a day, renewing anything within 30 days of expiry.

Test that the renewal process works:

```bash
sudo certbot renew --dry-run
```

No errors = you're locked in. If renewal ever actually fails, Let's Encrypt will email you a warning.

---

## Harden Your HTTPS (Don't Skip This)

Getting a cert is the baseline. If you want your setup to actually be solid, add these to your Nginx server block:

- **HSTS** — forces browsers to always use HTTPS:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

- **Modern TLS only** — drop the outdated stuff:

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:...';
```

> Heads up: go easy on HSTS with `preload` at first. Once you submit your domain to the preload list, there's no quick undo.

---

## Common Things That Go Wrong

| Problem              | Fix                                                       |
| -------------------- | --------------------------------------------------------- |
| ACME challenge fails | Make sure port 80 is reachable from the internet          |
| DNS mismatch error   | Confirm your A/AAAA records point to the right IP         |
| Wrong `server_name`  | Certbot needs it to match the domain you're requesting    |
| Hit rate limits      | Use `--dry-run` while testing to avoid burning attempts   |
| Snap vs APT conflict | Remove the APT certbot before installing the snap version |

---

If this saved your server from running plain HTTP in 2026, drop a comment or share it with whoever on your team is still putting off that SSL setup. They need this more than they know.
