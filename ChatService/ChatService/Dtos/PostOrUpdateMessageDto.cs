using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Dtos
{
    public class PostOrUpdateMessageDto
    {
        [Required]
        public string Id { get; init; }
        [Required]
        public string UserID { get; init; }
        [Required]
        public string UserName { get; init; }
        [Required]
        public string Message { get; init; }
        public DateTime CreateDate { get; init; }
    }
}
