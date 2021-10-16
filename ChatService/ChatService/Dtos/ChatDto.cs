using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Dtos
{
    public class ChatDto
    {        
        public string Id { get; init; }
        public string UserID { get; init; }
        public string UserName { get; init; }
        public string Message { get; init; }
        public DateTime CreateDate { get; init; }
    }
}
