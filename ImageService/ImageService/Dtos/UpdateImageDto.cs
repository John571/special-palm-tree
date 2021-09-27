using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Dtos
{
    public record UpdateImageDto
    {
        [Required]
        public int Id { get; init; }

        [Required]
        public int ProudctId { get; init; }

        public string Message { get; init; }

        [Required]
        public IFormFile Photo { get; set; }
    }
}
