<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" encoding="UTF-8"/>
<xsl:template match="/">
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title><xsl:value-of select="rss/channel/title"/> — RSS</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; }
  .container { max-width: 720px; margin: 0 auto; padding: 40px 24px; }
  .header { background: linear-gradient(135deg, #0f172a 0%, #334155 100%); color: #fff; padding: 48px 32px; border-radius: 16px; margin-bottom: 32px; }
  .header h1 { font-size: 1.8rem; margin-bottom: 8px; }
  .header p { color: #94a3b8; font-size: 0.95rem; }
  .badge { display: inline-block; background: rgba(255,255,255,0.15); color: #cbd5e1; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; margin-top: 12px; }
  .item { background: #fff; border-radius: 12px; padding: 24px 28px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: box-shadow 0.2s, transform 0.2s; border: 1px solid #e2e8f0; }
  .item:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }
  .item h2 { font-size: 1.05rem; margin-bottom: 6px; }
  .item h2 a { color: #0f172a; text-decoration: none; }
  .item h2 a:hover { color: #2563eb; }
  .item p { color: #64748b; font-size: 0.9rem; }
  .item .meta { font-size: 0.8rem; color: #94a3b8; margin-top: 8px; }
  .footer { text-align: center; padding: 32px 0; color: #94a3b8; font-size: 0.85rem; }
  .footer a { color: #2563eb; text-decoration: none; }
  .count { font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>🧰 <xsl:value-of select="rss/channel/title"/></h1>
    <p><xsl:value-of select="rss/channel/description"/></p>
    <span class="badge">RSS 2.0 订阅源</span>
  </div>
  <p class="count">共 <xsl:value-of select="count(rss/channel/item)"/> 篇文章</p>
  <xsl:for-each select="rss/channel/item">
    <div class="item">
      <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
      <p><xsl:value-of select="description"/></p>
      <div class="meta">
        📅 <xsl:value-of select="substring(pubDate, 1, 16)"/>
        · <a href="{link}">阅读原文 →</a>
      </div>
    </div>
  </xsl:for-each>
  <div class="footer">
    <p>订阅 <a><xsl:attribute name="href"><xsl:value-of select="rss/channel/link"/>/rss.xml</xsl:attribute>RSS</a> 获取最新文章</p>
  </div>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
