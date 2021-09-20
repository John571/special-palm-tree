using ImageService.Dtos;
using ImageService.Entities;
using ImageService.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Controllers
{
    //GET /images
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesRepository repository;

        public ImagesController(IImagesRepository repository)
        {
            this.repository = repository;
        }

        // GET /images
        [HttpGet]
        public IEnumerable<ImageDto> GetImages()
        {
            var images = repository.GetImages().Select(image => image.AsDto());
            return images;
        }

        // GET /Images/{id}
        [HttpGet("{id}")]
        public ActionResult<ImageDto> GetImage(int id)
        {
            var image = repository.GetImage(id);
            if(image is null)
            {
                return NotFound();
            }
            return image.AsDto();
        }

        // POST /images
        [HttpPost]
        public ActionResult<ImageDto> CreateImage(CreateImageDto imageDto)
        {
            Image image = new()
            {
                Id = imageDto.Id,
                ProudctId = imageDto.ProudctId,
                Message = imageDto.Message,
                CreateDate = DateTime.UtcNow
            };
            repository.CreatImage(image);
            return CreatedAtAction(nameof(GetImage), new { id = image.Id }, image.AsDto());
        }

    }
}
