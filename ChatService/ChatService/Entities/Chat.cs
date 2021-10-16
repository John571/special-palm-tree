using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Entities
{
    public class Chat
    {
        public string Id { get; init; }
        public string UserID { get; init; }
        public string UserName { get; init; }
        public string Message { get; init; }
        public DateTime CreateDate { get; init; }



    }
}
