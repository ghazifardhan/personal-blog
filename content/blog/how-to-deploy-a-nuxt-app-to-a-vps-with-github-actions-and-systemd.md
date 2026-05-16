---
title: How to Deploy a Nuxt App to a VPS with GitHub Actions and Systemd
cover: /Screenshot-2026-04-30-at-18.11.44.png
description: "A practical deployment pattern for Nuxt apps: build in GitHub Actions, copy the output to a VPS, and restart a systemd service."
draft: false
featured: true
navigation:
  title: Deploy Nuxt with GitHub Actions and Systemd
  description: "Build a Nuxt app in CI, ship it to a VPS, and run it as a reliable Linux service."
  icon: i-simple-icons:nuxtdotjs
publishedAt: 2026-05-16 09:50:00
readTime: 8
tags:
  - nuxt
  - github actions
  - vps
  - systemd
updatedAt: 2026-05-16 09:50:00
---

You do not need a complicated platform to deploy a Nuxt app. A VPS, GitHub Actions, and systemd are enough for a clean production setup.

The idea is simple:

1. Push code to GitHub
2. GitHub Actions installs dependencies and builds the app
3. The build output is copied to your VPS
4. systemd restarts the Nuxt server
5. Nginx sits in front as a reverse proxy

This setup is boring in the best way.

---

## 1. Build the Nuxt App

Most Nuxt apps produce a `.output` directory after build:

```bash
npm run build
```

Inside `.output/server/index.mjs` is the server entry point that can be run with Node.js.

On the VPS, the app can start like this:

```bash
node .output/server/index.mjs
```

---

## 2. Create a systemd Service

Create a service file like:

```ini
[Unit]
Description=Nuxt App
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/my-nuxt-app
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=NITRO_HOST=127.0.0.1

[Install]
WantedBy=multi-user.target
```

Then enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable my-nuxt-app
sudo systemctl start my-nuxt-app
```

---

## 3. Put Nginx in Front

Your Nuxt server should usually listen on localhost. Nginx handles public HTTP/HTTPS traffic.

Example:

```nginx
server {
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Add Let's Encrypt after that and you have HTTPS.

---

## 4. Add GitHub Actions

A simplified workflow looks like this:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - name: Copy build to VPS
        run: echo "Use rsync or scp here"
      - name: Restart service
        run: echo "SSH into VPS and restart systemd"
```

In a real workflow, store SSH keys, host, user, and target path as GitHub Secrets.

---

## 5. Restart Safely

After copying files, restart your service:

```bash
sudo systemctl restart my-nuxt-app
sudo systemctl status my-nuxt-app
```

Check logs if something breaks:

```bash
journalctl -u my-nuxt-app -f
```

This is one reason systemd is useful: it gives you process management, auto-restart, logs, and boot startup.

---

## Why This Setup Works

This deployment pattern is simple but powerful:

- GitHub builds the app consistently
- The VPS only runs production output
- systemd keeps the process alive
- Nginx handles domains and HTTPS
- No dashboard lock-in
- No surprise platform pricing

For personal blogs, portfolios, tools, and small SaaS apps, it is more than enough.

---

## Final Thoughts

Modern deployment does not have to be complicated.

If you understand GitHub Actions, SSH, systemd, and Nginx, you can deploy almost anything. More importantly, you understand what is actually happening when your app goes live.

That knowledge is worth keeping.
