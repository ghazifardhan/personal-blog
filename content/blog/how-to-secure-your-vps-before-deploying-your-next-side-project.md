---
title: How to Secure Your VPS Before Deploying Your Next Side Project
cover: /Screenshot-2026-04-30-at-18.11.44.png
description: "Before you deploy your next app, lock down SSH, enable a firewall, create a non-root user, install updates, and add basic monitoring."
draft: false
featured: true
navigation:
  title: Secure Your VPS Before Deploying
  description: "A practical checklist for making a new VPS safer before shipping your side project."
  icon: i-heroicons:shield-check
publishedAt: 2026-05-16 10:30:00
readTime: 7
tags:
  - vps
  - security
  - linux
  - deployment
updatedAt: 2026-05-16 10:30:00
---

A fresh VPS is not production-ready just because you can SSH into it.

Before deploying your next side project, take a few minutes to lock down the basics. You do not need enterprise security. You do need to avoid the obvious mistakes that bots scan for all day.

Here is a practical checklist.

---

## 1. Update the Server

Start with updates:

```bash
sudo apt update
sudo apt upgrade -y
```

Reboot if the kernel was updated:

```bash
sudo reboot
```

Old packages are one of the easiest ways to get owned.

---

## 2. Create a Non-Root User

Do not run everything as root.

```bash
adduser deploy
usermod -aG sudo deploy
```

Then SSH as that user and use `sudo` only when needed.

---

## 3. Use SSH Keys, Not Passwords

Copy your public key:

```bash
ssh-copy-id deploy@your-server-ip
```

Then edit SSH config:

```bash
sudo nano /etc/ssh/sshd_config
```

Recommended settings:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart SSH:

```bash
sudo systemctl restart ssh
```

Important: keep your current SSH session open while testing a new one, so you do not lock yourself out.

---

## 4. Enable a Firewall

Use UFW for a simple setup:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Only expose what you need.

If your app runs on port `3000`, keep it bound to `127.0.0.1` and proxy through Nginx instead of exposing it publicly.

---

## 5. Install Fail2ban

Fail2ban watches logs and bans repeated bad login attempts.

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Check status:

```bash
sudo fail2ban-client status
```

It is not magic, but it helps reduce noise.

---

## 6. Keep Apps Behind Nginx

For Node, Nuxt, Laravel, Rails, or similar apps, run the app on localhost and put Nginx in front.

This gives you:

- HTTPS termination
- Better request handling
- Cleaner domain routing
- Logs
- A single public entry point

Your app process should not need to listen directly on the public internet.

---

## 7. Add Basic Monitoring

At minimum, know how to check:

```bash
systemctl status your-service
journalctl -u your-service -f
df -h
free -m
htop
```

You do not need a full observability stack for every side project, but you should know when disk, memory, or your app process is failing.

---

## Final Checklist

Before deploying, confirm:

- Packages updated
- Non-root user created
- SSH keys enabled
- Root login disabled
- Password login disabled
- Firewall enabled
- Only ports 22, 80, and 443 open
- App bound to localhost
- Nginx reverse proxy configured
- HTTPS enabled
- systemd service working

---

## Final Thoughts

Security is not a one-time achievement. It is a habit.

But these basics already put you ahead of many rushed deployments. Lock down the server first, then ship the app.

Your future self will thank you when the logs are boring.
