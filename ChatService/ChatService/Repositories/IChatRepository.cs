using ChatService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Repositories
{
    public interface IChatRepository
    {
        Chat GetAllGroupMessages(string id);

        void PostORUpdateMessage(Chat chat);

        void DeleteAllGroupMessages(string id);

    }
}
