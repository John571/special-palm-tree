using ChatMessagesService.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatMessagesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("{id}")]
        public ActionResult<Chat> Get(string id)
        {
            var chat = _chatService.Get(id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }

        [HttpPost]
        public ActionResult<Chat> Create(Chat chat)
        {
            var Copychat = _chatService.Get(chat.Id);

            if (Copychat == null)
            {
                _chatService.Create(chat);
                return Ok();
            }

            _chatService.Create(chat , chat.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var chat = _chatService.Get(id);

            if (chat == null)
            {
                return NotFound();
            }

            _chatService.Remove(chat.Id);

            return NoContent();
        }
    }
}
