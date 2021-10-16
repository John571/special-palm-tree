using ChatService.Dtos;
using ChatService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService
{
    public static class Extensions
    {
        public static ChatDto AsDto(this Chat chat)
        {
            return new ChatDto
            {
                Id = chat.Id,
                UserID = chat.UserID,
                UserName = chat.UserName,
                Message = chat.Message, // Maybe We Need To Change The Type To List !! //
                CreateDate = chat.CreateDate
            };
        }
    }
}
