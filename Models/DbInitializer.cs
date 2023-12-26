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
                new Grade { Id = 1, IsVisible = true, Name = "الصف الأول" , image_url = "numbers/1.jpg" },
                new Grade { Id = 2, IsVisible = true, Name = "الصف الثاني", image_url = "numbers/2.jpg" },
                new Grade { Id = 3, IsVisible = true, Name = "الصف الثالث", image_url = "numbers/3.jpg" },
                new Grade { Id = 4, IsVisible = true, Name = "الصف الرابع", image_url = "numbers/4.jpg" },
                new Grade { Id = 5, IsVisible = true, Name = "الصف الخامس", image_url = "numbers/5.jpg" },
                new Grade { Id = 6, IsVisible = true, Name = "الصف السادس" , image_url = "numbers/6.jpg" },
                new Grade { Id = 7, IsVisible = true, Name = "الصف السابع" , image_url = "numbers/7.jpg" },
                new Grade { Id = 8, IsVisible = true, Name = "الصف الثامن" , image_url = "numbers/8.jpg" },
                new Grade { Id = 9, IsVisible = true, Name = "الصف التاسع" , image_url = "numbers/9.jpg" },
                new Grade { Id = 10, IsVisible = true, Name = "الصف العاشر" , image_url = "numbers/10.jpg" },
                new Grade { Id = 11, IsVisible = true, Name = "الصف الحادي عشر" , image_url = "numbers/11.jpg" },
                new Grade { Id = 12, IsVisible = true, Name = "الصف الثاني عشر" , image_url = "numbers/12.jpg" }
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
                new Topic { Id = 1, Title = "درس1", IsVisible = true, Term = 1,SubjectId = 1 , CreatedBy = 1 },
                new Topic { Id = 2, Title = "درس2", IsVisible = true, Term = 2,SubjectId = 1, CreatedBy = 1 },

                new Topic { Id = 3, Title = "درس3", IsVisible = true, Term = 1, SubjectId = 6, CreatedBy = 1 },
                new Topic { Id = 4, Title = "درس4", IsVisible = true, Term = 2, SubjectId = 6, CreatedBy = 1 }
            );

            // seeding data to content table
            modelBuilder.Entity<TopicContent>().HasData(
                new TopicContent { Id = 1, Content = "content ex 1", TopicId = 1},
                new TopicContent { Id = 2, Content = "content ex 2", TopicId = 2 },
                new TopicContent { Id = 3, Content = "content ex 3", TopicId = 3 },
                new TopicContent { Id = 4, Content = "content ex 4", TopicId = 4 }
            );


            // seeding data to users table
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Password = "2fgaPCZ6OmgiQLFYSSpLRAX+5byS3U/ryK6eXSBmtQHYAnu6", 
                            Username = "admin", Role = 1 } // 12345
                //new User { Id = 2, Content = "nkjnkoiuutdrf", TopicId = 2 },
                //new User { Id = 3, Content = "sdaer4er", TopicId = 3 }
            );


            // seeding data to contact info table
            modelBuilder.Entity<ContactInfo>().HasData(
                new ContactInfo
                {
                    Id = 1,
                    PhoneNo = 0100020000,
                    Email = "admin@gmail.com",
                }
            );


            // seeding data to Lookup table
            modelBuilder.Entity<Lookup>().HasData(
                new Lookup { Id = 1, LookupName = "user_role"}
            );

            // seeding data to LookupValues table
            modelBuilder.Entity<LookupValue>().HasData(
                new LookupValue { Id = 1, LookupValueName = "مدير", LookupId = 1 },
                new LookupValue { Id = 2, LookupValueName = "مشرف", LookupId = 1 }
            );




        }
    }
}
