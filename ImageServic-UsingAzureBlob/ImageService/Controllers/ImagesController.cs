using ImageService.Dtos;
using ImageService.Entities;
using ImageService.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace ImageService.Controllers
{
    //images
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesRepository repository;

        public ImagesController(IImagesRepository repository)
        {
            this.repository = repository;
        }

        // GET /Images/{id}
        [HttpGet("{id}")]
        public ActionResult<ImageDto> GetImage(int id) // List Id , Item id --> Photo 
        {
            var image = repository.GetImage(id);
            return image == null ? NotFound() : image.AsDto();

        }

        // POST /images
        [HttpPost]
        public ActionResult<ImageDto> CreateImage([FromForm] CreateImageDto imageDto)
        {
            var ms = new MemoryStream();
            imageDto.Photo.OpenReadStream().CopyTo(ms);

            string URL = BlobStorageURL.Upload(imageDto.Photo);

            // Post As String //
            Image image = new()
            {
                Id = imageDto.Id,
                ProudctId = imageDto.ProudctId,
                Message = imageDto.Message,
                Photo = URL, //Convert.ToBase64String(ms.ToArray()),
                CreateDate = DateTime.UtcNow
            };

            repository.CreatImage(image);
            return CreatedAtAction(nameof(GetImage), new { id = image.Id }, image.AsDto());
        }

        // PUT /images/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateImage([FromForm] UpdateImageDto imageDto , int id)
        {
            var existingImage = repository.GetImage(id);

            var ms = new MemoryStream();
            imageDto.Photo.OpenReadStream().CopyTo(ms);

            string URL = BlobStorageURL.Upload(imageDto.Photo);

            // Put As String //
            if (existingImage is null)
            {
                return NotFound();
            }

            Image UpdatedImage = existingImage with
            {
                Message = imageDto.Message,
                Photo = URL, // Convert.ToBase64String(ms.ToArray()),
                CreateDate = DateTime.UtcNow
            };

            repository.UpdateImage(UpdatedImage);
            return NoContent();
        }

        // DELETE /images/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteImage(int id)
        {
            var existingImage = repository.GetImage(id);

            if (existingImage is null)
            {
                return NotFound();
            }
            
            repository.DeleteImage(id);
            return NoContent();
        }

    }
}
