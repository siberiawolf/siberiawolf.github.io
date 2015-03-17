$(document).ready(function() {

    $('pre').addClass('prettyprint linenums'); //添加Google code Hight需要的class

    $('.entry a').each(function(index, element) { // 给链接添加小图标
        var href = $(this).attr('href');
        if (href) {
            if (href.indexOf('#') == 0) { // 存在锚链接
            } else if (href.indexOf('/') == 0 || href.toLowerCase().indexOf('siberiawolf.com') > -1) { // 根目录
            } else if ($(element).has('img').length) { // 链接中存在图片
            } else { // 否则添加小图标
                $(this).attr('target', '_blank');
                $(this).addClass('external');
            }
        }
    });    

    $.getScript('/js/prettify.min.js', function() {     // 添加
        prettyPrint();
    });

});
