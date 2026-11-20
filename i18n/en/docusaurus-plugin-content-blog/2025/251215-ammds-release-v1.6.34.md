---
slug: ammds-release-v1.6.34
title: Release AMMDS v1.6.34 — Built-in Metatube Service
authors: [ms]
tags: [ammds, release, feature]
date: 2025-12-15
---

# Release AMMDS v1.6.34 — Built-in Metatube Service

AMMDS v1.6.34 brings a major expansion of platform support, adding offline installation via the FnOS app store and Windows 10/11 installer support, along with a built-in Metatube scraping service.

{/* truncate */}

## FnOS App Store Support

This update adds **offline installation support via the FnOS app store**. FnOS users can now install AMMDS directly through the app store, greatly simplifying the deployment process:

- **Offline installer**: an offline installer for FnOS is provided, so installation can be completed without an internet connection
- **App store integration**: AMMDS is now listed in the FnOS app store, allowing one-click installation and updates
- **Automatic updates**: future versions will be pushed automatically through the app store channel

## Windows Installer Support

v1.6.34 officially releases the **Windows 10/11 installer**, making it easier for more users to use AMMDS in a desktop environment:

- Provides a graphical installation wizard that guides users through installation and configuration
- Supports Windows service mode with startup on boot
- Includes a shortcut to the management panel for convenient daily operation

## Relaxed Site Authentication

Based on community feedback, we adjusted the site authentication policy — **only site search requires authentication**. This means:

- Users can use most basic features without authentication
- Only modules involving resource search require site authentication
- Lowers the barrier to entry for new users and improves the user experience

## Built-in Metatube Service

**The Metatube service is now built into AMMDS**, and users can enable it themselves in the settings page:

- The built-in service removes the hassle of deploying Metatube separately
- Users can freely choose to enable or disable it, flexibly controlling system resource usage
- Deeply integrated with AMMDS's scraping engine for a smoother metadata retrieval experience

## Bug Fixes

- Fixed compatibility issues of the Windows installer on some system versions
- Fixed incomplete dependency checks in the FnOS offline installer
- Fixed conflicts between the built-in Metatube service and proxy configurations

---

## Keep reading

- [Release AMMDS v1.6.36 — Jav and Western Multimedia Search](../2025/251218-ammds-release-v1.6.36.md)
- [AMMDS Launcher: The Native Windows Client Is Officially Released](/blog/ammds-launcher-windows)
