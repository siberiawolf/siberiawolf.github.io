---
layout: home
---

<div class="index-content blog">
    <div class="section">
        <!-- 首页的导航 -->
        <ul class="artical-cate">
            <li class="on"><a href="/"><span>技术</span></a></li>
            <li style="text-align:center"><a href="/opinion"><span>生活</span></a></li>
            <li style="text-align:right"><a href="/project"><span>项目</span></a></li>
        </ul>
        <!-- 首页红色的导航 -->
        <div class="cate-bar"><span id="cateBar"></span></div>
        <!-- 文章列表 -->
        <ul class="artical-list">
        {% for post in site.categories.blog %}
            <li>
                <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
                <div class="title-desc">{{ post.description }}</div>
            </li>
        {% endfor %}
        </ul>
    </div>
    <!-- 显示首页左侧的图片 -->
    <div class="aside">
    </div>
</div>
