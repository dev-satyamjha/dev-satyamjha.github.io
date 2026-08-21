---
title: "Building ISM+: Native Windows Network Monitoring with C# .NET and WPF"
date: "2026-06-15"
description: "How I engineered ISM+, a lightweight floating network monitor on the Microsoft Store serving 400+ active users with under 70MB RAM footprint."
tags: ["csharp", "dotnet", "wpf", "windows", "desktop"]
readingTime: "6 min"
author: "Satyam Kumar"
---

## Solving a Real Network Monitoring Need

When working on campus networks with strict bandwidth caps and variable throughput, existing monitoring tools were often either bloated or lacked unobtrusive floating widgets.

I set out to build **ISM+**, a native Windows utility designed from the ground up to provide instant network telemetry while consuming minimal system resources.

## Architecture and Optimization Techniques

### 1. Minimizing Memory Footprint (under 70MB)
To ensure ISM+ could run continuously in the background without degrading system gaming or development performance:
- Replaced standard WPF visual trees with optimized low-level drawing contexts (`DrawingVisual`).
- Utilized lightweight Win32 API hooks (`GetIfTable2`, `NetApi32`) to query network adapters with zero polling overhead.
- Implemented aggressive Garbage Collection tuning and buffer pooling for packet sampling.

### 2. Floating Widget & Taskbar Integration
Users needed real-time visibility without switching windows. ISM+ includes:
- A draggable, borderless floating widget with snap-to-edge magnetic docking.
- Taskbar notification area tray indicators with color-coded speed graphs.
- Configurable transparency and click-through modes.

## Distribution on the Microsoft Store

Publishing to the Microsoft Store involved:
- MSIX packaging with strict capability declarations.
- Implementing freemium licensing using the Windows.Services.Store API.
- Automated crash telemetry and weekly update rollouts.

Today, ISM+ is actively used by over 400 developers and power users worldwide.
