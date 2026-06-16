#!/usr/bin/env node
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('\n=====================================================');
console.log('💾 DATABASE MANAGEMENT UTILITY');
console.log('=====================================================\n');

rl.question(
    'Choose an option:\n\n' +
        '1️⃣  Create/Recreate Database (drops existing DB if any, creates new schema and data)\n' +
        '2️⃣  Update Schema Only (keeps data, only applies schema changes)\n\n' +
        'Enter option (1-2): ',
    (answer) => {
        try {
            switch (answer.trim()) {
                case '1':
                    console.log('\n🔄 Creating/Recreating database and data...');
                    execSync('pnpm run db:drop && pnpm run db:init', { stdio: 'inherit' });
                    console.log('\n✅ Database created successfully with fresh data!');
                    break;

                case '2':
                    console.log('\n🔄 Updating schema only (keeping existing data)...');
                    execSync('pnpm run build && pnpm run migration:run', { stdio: 'inherit' });
                    console.log('\n✅ Schema updated successfully!');
                    break;

                default:
                    console.log('\n❌ Invalid option selected.');
            }
        } catch (error) {
            console.error('\n❌ An error occurred:', error.message);
        }

        rl.close();
    },
);
