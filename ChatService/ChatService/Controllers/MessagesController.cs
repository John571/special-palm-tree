using ChatService.Dtos;
using ChatService.Entities;
using ChatService.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IChatRepository repository;

        public MessagesController(IChatRepository repository)
        {
            this.repository = repository;
        }

        //https://localhost:44358/Messages/GroupId
        //Get All Using Group ID//
        [HttpGet("{id}")]
        public ActionResult<ChatDto> GetAllGroupMessages(string id)
        {
            // We Need To Return All The Group Messages, Not Just One Message//
            // Maybe We Can Use A List Or Use a Loop, and check all the database using the group ID //

            var messages = repository.GetAllGroupMessages(id);
            return messages == null ? NotFound() : messages.AsDto();
        }

        //Post Or Update Into Database Using Object Id//
        //https://localhost:44358/Messages
        
          //"id": "string",
          //"userID": "string",
          //"userName": "string",
          //"message": "string",
          //"createDate": "2021-10-16T12:16:33.791Z"

        [HttpPost]
        public ActionResult<ChatDto> PostORUpdateMessage([FromBody]PostOrUpdateMessageDto chatDto)
        {
            // We will post always as new 
            Chat chat = new()
            {
                Id = chatDto.Id,
                UserID = chatDto.UserID,
                UserName = chatDto.UserName,
                Message = chatDto.Message,
                CreateDate = DateTime.Now // We need to reorder the Date and Time As a string //
            };

            repository.PostORUpdateMessage(chat);
            //Check If The Created Action Is Using The Guid Object ID -->
            //If it's An Error, then we need to change it to the guid id//
            return CreatedAtAction(nameof(GetAllGroupMessages), new { id = chat.Id }, chat.AsDto());
        }

        //Delete Group Messages --> If The Group Deleted, we need also to delete
        //all the group chat messages grom the database using the group Id//

        //Delete Using Group ID
        //https://localhost:44358/Messages/GroupId
        [HttpDelete("{id}")]
        public ActionResult DeleteAllGroupMessages(string id)
        {
            //I think we need to implement a loop that checks all the messages that using -->
            //the same group id, or maybe we can save all the messages in a object list into -->
            //the database
            var existingChatMessages = repository.GetAllGroupMessages(id);

            if (existingChatMessages is null) return NotFound();

            repository.DeleteAllGroupMessages(id);
            return NoContent();
        }
    }
}
