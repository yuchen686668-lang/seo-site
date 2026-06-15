# Cloudflare Pages 部署

## 方式一：Cloudflare Pages（推荐，免费）

1. 把你的代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages
3. 点击 "Create application" → "Pages" → "Connect to Git"
4. 选择你的仓库
5. 构建设置：
   - Build command: `node build.js`
   - Build output directory: `dist`
6. 点击 "Save and Deploy"
7. 首次部署完成后，Cloudflare 会分配一个 `xxx.pages.dev` 域名
8. 去域名注册商那里把你自己买的域名 CNAME 指向这个地址

## 方式二：GitHub Pages（免费）

1. 推送到 GitHub
2. Settings → Pages → Source: GitHub Actions
3. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: node build.js
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 部署后要做的事

1. **把网站里所有的 `YOUR-DOMAIN.com` 替换成你的真实域名**
   - 全局搜索替换 build.js 里的 `YOUR-DOMAIN.com`
   - 替换 index.html、about.html、privacy.html 里的 `YOUR-DOMAIN.com`

2. **注册 Google AdSense**（被动收入来源）
   - 访问 adsense.google.com
   - 用你的域名申请
   - AdSense 审核通常需要 1-4 周
   - 审核通过后，把 AdSense 代码加到 `_templates/article.html` 和 `index.html` 的 `<head>` 里

3. **注册 Google Analytics**（可选）
   - 访问 analytics.google.com
   - 创建账号 → 添加数据流 → 复制 Measurement ID
   - 加到每个页面的 `<head>` 里

4. **提交到搜索引擎**
   - Google Search Console：提交 sitemap.xml
   - 百度站长平台：提交 sitemap.xml
   - Bing Webmaster Tools：提交 sitemap.xml
