"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1703001000000 = void 0;
class InitialSchema1703001000000 {
    constructor() {
        this.name = 'InitialSchema1703001000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "schools" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "code" character varying(50) NOT NULL,
        "address" text,
        "phone" character varying(20),
        "email" character varying(255),
        "settings" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_schools_code" UNIQUE ("code"),
        CONSTRAINT "PK_schools_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('super_admin', 'admin', 'teacher', 'student', 'parent', 'family');
      CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'suspended', 'pending');
      
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "password" character varying,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'student',
        "status" "public"."users_status_enum" NOT NULL DEFAULT 'active',
        "profilePicture" character varying,
        "phone" character varying,
        "preferences" json,
        "googleId" character varying,
        "isEmailVerified" boolean NOT NULL DEFAULT false,
        "isGoogleAuth" boolean NOT NULL DEFAULT false,
        "lastLogin" TIMESTAMP,
        "lastLoginAt" TIMESTAMP,
        "classId" character varying,
        "familyId" character varying,
        "gamification" json,
        "schoolId" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."resources_type_enum" AS ENUM('classroom', 'laboratory', 'gymnasium', 'library', 'auditorium', 'computer_room', 'music_room', 'art_room', 'cafeteria', 'playground', 'equipment', 'vehicle', 'sports', 'study');
      CREATE TYPE "public"."resources_status_enum" AS ENUM('available', 'occupied', 'maintenance', 'reserved', 'out_of_service');
      
      CREATE TABLE "resources" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "description" text,
        "type" "public"."resources_type_enum" NOT NULL,
        "status" "public"."resources_status_enum" NOT NULL DEFAULT 'available',
        "schoolId" character varying,
        "building" character varying(50),
        "floor" character varying(20),
        "roomNumber" character varying(20),
        "capacity" integer,
        "features" jsonb,
        "schedule" jsonb,
        "restrictions" jsonb,
        "maintenance" jsonb,
        "hourlyRate" numeric(10,2),
        "location" jsonb,
        "images" jsonb,
        "documents" jsonb,
        "responsibleTeacherId" uuid,
        "departmentId" uuid,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_resources_name_school" UNIQUE ("name", "schoolId"),
        CONSTRAINT "PK_resources_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."reservations_type_enum" AS ENUM('class', 'meeting', 'event', 'maintenance', 'personal', 'extra_curricular');
      CREATE TYPE "public"."reservations_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed', 'rejected');
      
      CREATE TABLE "reservations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "resourceId" uuid NOT NULL,
        "userId" uuid NOT NULL,
        "schoolId" uuid NOT NULL,
        "startTime" TIMESTAMP NOT NULL,
        "endTime" TIMESTAMP NOT NULL,
        "title" character varying(200) NOT NULL,
        "description" text,
        "type" "public"."reservations_type_enum" NOT NULL,
        "status" "public"."reservations_status_enum" NOT NULL DEFAULT 'pending',
        "aiProcessing" jsonb,
        "participants" jsonb,
        "requirements" jsonb,
        "notifications" jsonb,
        "recurring" jsonb,
        "parentReservationId" uuid,
        "approvedBy" uuid,
        "approvedAt" TIMESTAMP,
        "rejectionReason" text,
        "cancelledBy" uuid,
        "cancelledAt" TIMESTAMP,
        "cancellationReason" text,
        "feedback" jsonb,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_reservations_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE "gamification_points" (
        "id" SERIAL NOT NULL,
        "userId" character varying NOT NULL,
        "points" integer NOT NULL DEFAULT 0,
        "level" integer NOT NULL DEFAULT 1,
        "xp" integer NOT NULL DEFAULT 0,
        "badges" jsonb NOT NULL DEFAULT '[]',
        "achievements" jsonb NOT NULL DEFAULT '[]',
        "lastActivity" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_gamification_points_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."messages_type_enum" AS ENUM('direct', 'broadcast', 'urgent', 'system');
      CREATE TYPE "public"."messages_priority_enum" AS ENUM('low', 'normal', 'high', 'urgent');
      
      CREATE TABLE "messages" (
        "id" SERIAL NOT NULL,
        "senderId" character varying NOT NULL,
        "receiverId" character varying NOT NULL,
        "subject" character varying(255),
        "content" text NOT NULL,
        "type" "public"."messages_type_enum" NOT NULL DEFAULT 'direct',
        "priority" "public"."messages_priority_enum" NOT NULL DEFAULT 'normal',
        "isRead" boolean NOT NULL DEFAULT false,
        "parentMessageId" integer,
        "attachments" jsonb,
        "translatedContent" jsonb,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_messages_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."notifications_type_enum" AS ENUM('info', 'warning', 'error', 'success', 'reservation', 'message', 'academic', 'system');
      
      CREATE TABLE "notifications" (
        "id" SERIAL NOT NULL,
        "userId" character varying NOT NULL,
        "title" character varying(255) NOT NULL,
        "message" text NOT NULL,
        "type" "public"."notifications_type_enum" NOT NULL DEFAULT 'info',
        "isRead" boolean NOT NULL DEFAULT false,
        "actionUrl" character varying(500),
        "metadata" jsonb,
        "readAt" TIMESTAMP,
        "expiresAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_notifications_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."academic_progress_evaluation_type_enum" AS ENUM('quiz', 'exam', 'assignment', 'project', 'participation', 'homework', 'presentation', 'laboratory');
      
      CREATE TABLE "academic_progress" (
        "id" SERIAL NOT NULL,
        "studentId" character varying NOT NULL,
        "subject" character varying(100) NOT NULL,
        "evaluationType" "public"."academic_progress_evaluation_type_enum" NOT NULL,
        "title" character varying(255) NOT NULL,
        "description" text,
        "score" numeric(5,2),
        "maxScore" numeric(5,2) NOT NULL DEFAULT 100,
        "feedback" text,
        "date" date NOT NULL,
        "aiInsights" jsonb,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_academic_progress_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`CREATE INDEX "IDX_resources_name_school" ON "resources" ("name", "schoolId")`);
        await queryRunner.query(`CREATE INDEX "IDX_reservations_resource_time" ON "reservations" ("resourceId", "startTime", "endTime")`);
        await queryRunner.query(`CREATE INDEX "IDX_reservations_user_time" ON "reservations" ("userId", "startTime")`);
        await queryRunner.query(`CREATE INDEX "IDX_messages_sender_receiver" ON "messages" ("senderId", "receiverId")`);
        await queryRunner.query(`CREATE INDEX "IDX_messages_receiver_read" ON "messages" ("receiverId", "isRead")`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_user_read" ON "notifications" ("userId", "isRead")`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_user_type" ON "notifications" ("userId", "type")`);
        await queryRunner.query(`CREATE INDEX "IDX_academic_progress_student_subject" ON "academic_progress" ("studentId", "subject")`);
        await queryRunner.query(`CREATE INDEX "IDX_academic_progress_student_date" ON "academic_progress" ("studentId", "date")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_school" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resources" ADD CONSTRAINT "FK_resources_school" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gamification_points" ADD CONSTRAINT "FK_gamification_points_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_sender" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_receiver" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_parent" FOREIGN KEY ("parentMessageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_notifications_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academic_progress" ADD CONSTRAINT "FK_academic_progress_student" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "academic_progress" DROP CONSTRAINT "FK_academic_progress_student"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_notifications_user"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_parent"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_receiver"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_sender"`);
        await queryRunner.query(`ALTER TABLE "gamification_points" DROP CONSTRAINT "FK_gamification_points_user"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_resources_school"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_school"`);
        await queryRunner.query(`DROP INDEX "IDX_academic_progress_student_date"`);
        await queryRunner.query(`DROP INDEX "IDX_academic_progress_student_subject"`);
        await queryRunner.query(`DROP INDEX "IDX_notifications_user_type"`);
        await queryRunner.query(`DROP INDEX "IDX_notifications_user_read"`);
        await queryRunner.query(`DROP INDEX "IDX_messages_receiver_read"`);
        await queryRunner.query(`DROP INDEX "IDX_messages_sender_receiver"`);
        await queryRunner.query(`DROP INDEX "IDX_reservations_user_time"`);
        await queryRunner.query(`DROP INDEX "IDX_reservations_resource_time"`);
        await queryRunner.query(`DROP INDEX "IDX_resources_name_school"`);
        await queryRunner.query(`DROP TABLE "academic_progress"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "gamification_points"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "resources"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "schools"`);
        await queryRunner.query(`DROP TYPE "public"."academic_progress_evaluation_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."messages_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."messages_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.InitialSchema1703001000000 = InitialSchema1703001000000;
//# sourceMappingURL=001-initial-schema.js.map