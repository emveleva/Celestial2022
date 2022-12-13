using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class LikedArticle
    {

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }


        public int ArticleId { get; set; }
        public Article Article { get; set; }

    }
}