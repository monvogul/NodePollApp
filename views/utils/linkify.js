function escapeHTML(text) {
    return $('<div/>').text(text).html()
}
function linkify(comment) {
    if (!(comment.hashtags)) {
        return comment.text;
    }
    var index_map = {};

    $.each(comment.hashtags, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='/api/topic/"+entry.text+"'>"+escapeHTML(text)+"</a>"}]

    });



    var result = "";
    var last_i = 0;
    var i = 0;

    // iterate through the string looking for matches in the index_map
    for (i=0; i < comment.text.length; ++i) {
        var hash = index_map[i];

        if (hash) {
            console.log(hash) ;
            var end = hash[0];
            var func = hash[1];
            if (i > last_i) {
                result += escapeHTML(comment.text.substring(last_i, i));
            }
            result += func(comment.text.substring(i, end));
            i = end - 1;
            last_i = end;
        }
    }

    if (i > last_i) {
        result += escapeHTML(comment.text.substring(last_i, i) );
    }

    console.log(result) ;
    return result ;
}
