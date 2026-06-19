// public/site-helper.js
// 页面辅助功能：提示卡片、关键词徽章、访问说明

(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://portalweb-aiyouxi.com.cn',
    keyword: '爱游戏',
    cardTitle: '欢迎访问',
    cardMessage: '这里是最新游戏资讯与活动汇总平台。',
    badgeLabel: '热门关键词',
    visitHint: '请使用现代浏览器访问以获得最佳体验。'
  };

  // 工具：创建带样式的元素
  function createStyledElement(tag, styles, content) {
    var el = document.createElement(tag);
    if (styles) {
      for (var key in styles) {
        if (styles.hasOwnProperty(key)) {
          el.style[key] = styles[key];
        }
      }
    }
    if (content) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else if (content instanceof HTMLElement) {
        el.appendChild(content);
      }
    }
    return el;
  }

  // 工具：创建圆角徽章
  function createBadge(text, color) {
    var badge = createStyledElement('span', {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      backgroundColor: color || '#4a90d9',
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '500',
      margin: '4px 6px 4px 0',
      whiteSpace: 'nowrap'
    }, text);
    return badge;
  }

  // 生成提示卡片
  function createHintCard() {
    var card = createStyledElement('div', {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      maxWidth: '320px',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      padding: '18px 20px',
      zIndex: '9999',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.5'
    });

    // 标题行
    var titleRow = createStyledElement('div', {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px'
    });
    var icon = createStyledElement('span', {
      fontSize: '22px',
      marginRight: '8px'
    }, '💡');
    var title = createStyledElement('span', {
      fontWeight: '600',
      fontSize: '17px',
      color: '#222'
    }, CONFIG.cardTitle);
    titleRow.appendChild(icon);
    titleRow.appendChild(title);
    card.appendChild(titleRow);

    // 描述
    var desc = createStyledElement('p', {
      margin: '6px 0 12px 0',
      color: '#444',
      fontSize: '14px'
    }, CONFIG.cardMessage);
    card.appendChild(desc);

    // 访问链接说明
    var linkHint = createStyledElement('p', {
      margin: '0 0 8px 0',
      fontSize: '13px',
      color: '#666'
    }, '🔗 本站地址：');
    var siteLink = createStyledElement('a', {
      color: '#1a73e8',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '13px'
    }, CONFIG.siteUrl);
    siteLink.href = CONFIG.siteUrl;
    siteLink.target = '_blank';
    siteLink.rel = 'noopener noreferrer';
    linkHint.appendChild(siteLink);
    card.appendChild(linkHint);

    // 关键词徽章区
    var badgeContainer = createStyledElement('div', {
      marginTop: '6px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    });
    var badgeLabel = createStyledElement('span', {
      fontSize: '13px',
      color: '#555',
      marginRight: '6px'
    }, CONFIG.badgeLabel + ':');
    badgeContainer.appendChild(badgeLabel);
    var badge = createBadge(CONFIG.keyword, '#e67e22');
    badgeContainer.appendChild(badge);
    card.appendChild(badgeContainer);

    // 关闭按钮
    var closeBtn = createStyledElement('button', {
      position: 'absolute',
      top: '10px',
      right: '12px',
      background: 'transparent',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#999',
      padding: '0 4px',
      lineHeight: '1'
    }, '×');
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(card);
    });
    card.appendChild(closeBtn);

    return card;
  }

  // 生成访问提示条（页面顶部）
  function createVisitBanner() {
    var banner = createStyledElement('div', {
      backgroundColor: '#f0f7ff',
      borderBottom: '1px solid #d0e3f7',
      padding: '12px 20px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#2c3e50',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    });

    var textSpan = createStyledElement('span', {}, CONFIG.visitHint);
    banner.appendChild(textSpan);

    // 小徽章点缀
    var miniBadge = createBadge(CONFIG.keyword, '#3498db');
    miniBadge.style.marginLeft = '10px';
    miniBadge.style.fontSize = '12px';
    miniBadge.style.padding = '2px 10px';
    banner.appendChild(miniBadge);

    return banner;
  }

  // 页面加载完成后添加组件
  function initOnReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addComponents);
    } else {
      addComponents();
    }
  }

  function addComponents() {
    // 添加顶部横幅
    var banner = createVisitBanner();
    var firstChild = document.body.firstChild;
    if (firstChild) {
      document.body.insertBefore(banner, firstChild);
    } else {
      document.body.appendChild(banner);
    }

    // 添加右下角卡片（延迟200ms减少突兀）
    setTimeout(function() {
      var card = createHintCard();
      document.body.appendChild(card);
    }, 200);
  }

  // 启动
  initOnReady();

})();