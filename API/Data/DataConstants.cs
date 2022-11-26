using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class DataConstants
    {
        public class User
        {
            public const int FirstNameMaxLength = 20;
            public const int LastNameMaxLength = 20;
        };
        public class Article
        {
            public const int TitleMaxLength = 60;
            public const int AuthorFirstMaxLength = 20;
            public const int AuthorLastMaxLength = 20;
        }
    }
}