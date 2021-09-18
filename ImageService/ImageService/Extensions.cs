using ImageService.Dtos;
using ImageService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService
{
    public static class Extensions
    {
       public static ImageDto AsDto(this Image image)
       {
            return new ImageDto
            {
                Id = image.Id,
                ProudctId =image.ProudctId,
                Message = image.Message,
                CreateDate = image.CreateDate
            };
       }
    }
}
