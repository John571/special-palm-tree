using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Dtos
{
    public record CreateImageDto
    {
        [Required]
        public int Id { get; init; }
        
        [Required]
        public int ProudctId { get; init; }
        
        [Required]
        public string Message { get; init; }
    }
}
