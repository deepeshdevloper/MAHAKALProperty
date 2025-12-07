#!/bin/bash
npx concurrently --kill-others "npx tsx watch server/index.ts" "npx vite --port 5000"
