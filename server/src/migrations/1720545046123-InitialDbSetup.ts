import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDbSetup1720545046123 implements MigrationInterface {
    name = 'InitialDbSetup1720545046123';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table first
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" varchar NOT NULL,
                "password" varchar NOT NULL,
                "role" varchar NOT NULL DEFAULT 'user',
                "email" varchar(255),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Create gender enum type for profiles
        await queryRunner.query(`
            CREATE TYPE "gender_enum" AS ENUM ('male', 'female', 'other')
        `);

        // Create profiles table
        await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "full_name" varchar(255),
                "gender" "gender_enum",
                "date_of_birth" date,
                "phone_number" varchar(20),
                "avatar_url" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_profiles_user_id" UNIQUE ("user_id"),
                CONSTRAINT "PK_profiles" PRIMARY KEY ("id"),
                CONSTRAINT "FK_profiles_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
            )
        `);

        // Create addresses table
        await queryRunner.query(`
            CREATE TABLE "addresses" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "name" character varying,
                "recipientName" character varying NOT NULL,
                "streetAddress" character varying NOT NULL,
                "city" character varying NOT NULL,
                "state" character varying,
                "postalCode" character varying NOT NULL,
                "country" character varying NOT NULL,
                "phoneNumber" character varying,
                "isDefaultShipping" boolean NOT NULL DEFAULT false,
                "isDefaultBilling" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_addresses" PRIMARY KEY ("id"),
                CONSTRAINT "FK_addresses_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Create products table
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL NOT NULL,
                "name" varchar(255) NOT NULL,
                "description" text,
                "price" numeric(10, 2) NOT NULL,
                "stock" integer DEFAULT 0,
                "category" varchar(100),
                "image_url" text,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_products" PRIMARY KEY ("id")
            )
        `);

        // Create orders table
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL NOT NULL,
                "user_id" integer,
                "total_price" numeric(10, 2) NOT NULL,
                "status" varchar(50) DEFAULT 'pending',
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_orders" PRIMARY KEY ("id"),
                CONSTRAINT "FK_orders_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "orders_status_check" CHECK ((status)::text = ANY (ARRAY['pending'::varchar, 'paid'::varchar, 'shipped'::varchar, 'delivered'::varchar, 'cancelled'::varchar]::text[]))
            )
        `);

        // Create order_items table
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" SERIAL NOT NULL,
                "order_id" integer,
                "product_id" integer,
                "quantity" integer NOT NULL,
                "price" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_order_items" PRIMARY KEY ("id"),
                CONSTRAINT "FK_order_items_orders" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_order_items_products" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE,
                CONSTRAINT "order_items_quantity_check" CHECK (quantity > 0)
            )
        `);

        // Create cart table
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "user_id" integer,
                "product_id" integer,
                "quantity" integer NOT NULL,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_cart" PRIMARY KEY ("id"),
                CONSTRAINT "FK_cart_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_cart_products" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE,
                CONSTRAINT "cart_quantity_check" CHECK (quantity > 0)
            )
        `);

        // Create payments table
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" SERIAL NOT NULL,
                "order_id" integer,
                "payment_method" varchar(50),
                "status" varchar(50) DEFAULT 'pending',
                "transaction_id" varchar(100),
                "amount" numeric(10, 2) NOT NULL,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_payments" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_payments_transaction_id" UNIQUE ("transaction_id"),
                CONSTRAINT "FK_payments_orders" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
                CONSTRAINT "payments_payment_method_check" CHECK ((payment_method)::text = ANY (ARRAY['credit_card'::varchar, 'paypal'::varchar, 'momo'::varchar, 'vnpay'::varchar]::text[])),
                CONSTRAINT "payments_status_check" CHECK ((status)::text = ANY (ARRAY['pending'::varchar, 'success'::varchar, 'failed'::varchar]::text[]))
            )
        `);

        // Create payment_logs table
        await queryRunner.query(`
            CREATE TABLE "payment_logs" (
                "id" SERIAL NOT NULL,
                "payment_id" integer,
                "status" varchar(50),
                "message" text,
                "created_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_payment_logs" PRIMARY KEY ("id"),
                CONSTRAINT "FK_payment_logs_payments" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE,
                CONSTRAINT "payment_logs_status_check" CHECK ((status)::text = ANY (ARRAY['pending'::varchar, 'success'::varchar, 'failed'::varchar, 'refunded'::varchar]::text[]))
            )
        `);

        // Create refunds table
        await queryRunner.query(`
            CREATE TABLE "refunds" (
                "id" SERIAL NOT NULL,
                "payment_id" integer,
                "amount" numeric(10, 2) NOT NULL,
                "status" varchar(50) DEFAULT 'pending',
                "reason" text,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_refunds" PRIMARY KEY ("id"),
                CONSTRAINT "FK_refunds_payments" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE,
                CONSTRAINT "refunds_status_check" CHECK ((status)::text = ANY (ARRAY['pending'::varchar, 'approved'::varchar, 'rejected'::varchar, 'completed'::varchar]::text[]))
            )
        `);

        // Create discounts table
        await queryRunner.query(`
            CREATE TABLE "discounts" (
                "id" SERIAL NOT NULL,
                "code" varchar(50) NOT NULL,
                "discount_type" varchar(50),
                "value" numeric(10, 2) NOT NULL,
                "min_order_amount" numeric(10, 2),
                "max_discount" numeric(10, 2),
                "expires_at" TIMESTAMP,
                "created_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "PK_discounts" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_discounts_code" UNIQUE ("code"),
                CONSTRAINT "discounts_discount_type_check" CHECK ((discount_type)::text = ANY (ARRAY['percent'::varchar, 'fixed'::varchar]::text[]))
            )
        `);

        // Create order_discounts table
        await queryRunner.query(`
            CREATE TABLE "order_discounts" (
                "id" SERIAL NOT NULL,
                "order_id" integer,
                "discount_id" integer,
                "discount_amount" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_order_discounts" PRIMARY KEY ("id"),
                CONSTRAINT "FK_order_discounts_orders" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_order_discounts_discounts" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order to avoid foreign key constraint errors
        await queryRunner.query(`DROP TABLE IF EXISTS "order_discounts" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "discounts" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "refunds" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "payment_logs" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "payments" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "cart" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "order_items" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "orders" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "products" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "addresses" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "profiles" CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS "gender_enum" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
    }
}
