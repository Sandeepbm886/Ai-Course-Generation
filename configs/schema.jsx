import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList=pgTable('courseList',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    courseName:varchar('courseName').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    duration:varchar('duration').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage')
})