using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserArticle
    {
        [Required]
        public string? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [Required]
        public int ArticleId { get; set; }

        [ForeignKey(nameof(ArticleId))]
        public Article? Article { get; set; }
    }
}