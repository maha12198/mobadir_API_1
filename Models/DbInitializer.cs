using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            // seeding data to grade table // don't forget to add migration
            modelBuilder.Entity<Grade>().HasData(
                new Grade { Id = 1, IsVisible = true, Name = "الصف الأول" },
                new Grade { Id = 2, IsVisible = true, Name = "الصف الثاني" },
                new Grade { Id = 3, IsVisible = true, Name = "الصف الثالث" },
                new Grade { Id = 4, IsVisible = true, Name = "الصف الرابع" },
                new Grade { Id = 5, IsVisible = true, Name = "الصف الخامس" },
                new Grade { Id = 6, IsVisible = true, Name = "الصف السادس" },
                new Grade { Id = 7, IsVisible = true, Name = "الصف السابع" },
                new Grade { Id = 8, IsVisible = true, Name = "الصف الثامن" },
                new Grade { Id = 9, IsVisible = true, Name = "الصف التاسع" },
                new Grade { Id = 10, IsVisible = true, Name = "الصف العاشر" },
                new Grade { Id = 11, IsVisible = true, Name = "الصف الحادي عشر" },
                new Grade { Id = 12, IsVisible = true, Name = "الصف الثاني عشر" }
            );

            // seeding data to subject table
            modelBuilder.Entity<Subject>().HasData(
                new Subject { Id = 1, Name = "مادة الرياضيات", IsVisible = true, GradeId = 1  },
                new Subject { Id = 2, Name = "مادة العلوم", IsVisible = true, GradeId = 1 },
                new Subject { Id = 3, Name = "مادة اللغة العربية", IsVisible = true, GradeId = 1 },

                new Subject { Id = 4, Name = "مادة الرياضيات", IsVisible = true, GradeId = 2 },
                new Subject { Id = 5, Name = "مادة اللغة الانجليزية", IsVisible = true, GradeId = 2 },

                new Subject { Id = 6, Name = "مادة اللغة العربية", IsVisible = true, GradeId = 3 },

                new Subject { Id = 7, Name = "مادة الرياضيات", IsVisible = true, GradeId = 4 },

                new Subject { Id = 8, Name = "مادة العلوم", IsVisible = true, GradeId = 5 },

                new Subject { Id = 9, Name = "مادة اللغة الانجليزية", IsVisible = true, GradeId = 6 },
                new Subject { Id = 10, Name = "مادة الرياضيات", IsVisible = true, GradeId = 6 }
            );

            // seeding data to topic table
            modelBuilder.Entity<Topic>().HasData(
                new Topic { Id = 1, Title = "درس1", IsVisible = true, Term = 1,SubjectId = 1, ContentId = 1 , CreatedBy = 4  },
                new Topic { Id = 2, Title = "دررس", IsVisible = true, Term = 2,SubjectId = 1, ContentId = 2 , CreatedBy = 4  },

                new Topic { Id = 3, Title = "درس2", IsVisible = true, Term = 1, SubjectId = 6, ContentId = 3, CreatedBy = 4 },
                new Topic { Id = 4, Title = "درس3", IsVisible = true, Term = 2, SubjectId = 6, ContentId = 4, CreatedBy = 4 }
            );

            // seeding data to content table
            modelBuilder.Entity<TopicContent>().HasData(
                new TopicContent { Id = 1, Content = "kjknjknjknjnjnk" },
                new TopicContent { Id = 2, Content = "nkjnkoiuutdrf" },
                new TopicContent { Id = 3, Content = "sdaer4er" },
                new TopicContent { Id = 4, Content = "dser4xs" }
            );
        }
    }
}
