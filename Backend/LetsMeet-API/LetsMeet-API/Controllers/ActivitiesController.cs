using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LetsMeet_API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return Ok(await _context.Activities.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return Ok(await _context.Activities.FindAsync(id));
        }
    }
}
