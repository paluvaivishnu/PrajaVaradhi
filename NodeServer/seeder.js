const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Issue, Scheme, Budget, Analytics } = require('./models');

// Load env variables
dotenv.config();

// Sample data
const sampleUsers = [
    {
        name: 'Admin User',
        email: 'admin@prajavaradhi.gov.in',
        phone: '9999999999',
        password: 'admin123',
        role: 'admin',
        district: 'Visakhapatnam'
    },
    {
        name: 'Ramesh Kumar',
        email: 'ramesh@example.com',
        phone: '9876543210',
        password: 'user123',
        role: 'citizen',
        district: 'Visakhapatnam',
        address: 'MVP Colony, Visakhapatnam'
    },
    {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        password: 'user123',
        role: 'citizen',
        district: 'Guntur',
        address: 'Arundelpet, Guntur'
    }
];

const sampleSchemes = [
    {
        name: 'Annadata Sukhibhava',
        description: 'Financial assistance to farmers to support agricultural investments and crop productivity.',
        category: 'Agriculture',
        department: 'Agriculture Department',
        eligibilityCriteria: 'All registered farmers in Andhra Pradesh',
        benefits: 'Financial support of ₹20,000 per year per farmer',
        applicationProcess: 'Apply online through AP Agriculture portal',
        documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
        budgetAllocated: 500000000,
        budgetUtilized: 320000000,
        targetBeneficiaries: 2500000,
        beneficiariesEnrolled: 1850000,
        officialWebsite: 'https://apagrisnet.gov.in',
        contactNumber: '1800-425-0000',
        startDate: new Date('2024-06-01'),
        isActive: true,
        districts: ['All Districts'],
        icon: '🌾'
    },
    {
        name: 'Thalliki Vandanam',
        description: 'Financial support to mothers for the education of school-going children.',
        category: 'Education',
        department: 'Women & Child Development',
        eligibilityCriteria: 'Mothers with school-going children',
        benefits: 'Financial assistance of ₹15,000 per year',
        applicationProcess: 'Apply through schools or online portal',
        documentsRequired: ['Mother\'s Aadhaar', 'School Certificate', 'Bank Details'],
        budgetAllocated: 300000000,
        budgetUtilized: 180000000,
        targetBeneficiaries: 1500000,
        beneficiariesEnrolled: 980000,
        officialWebsite: 'https://wdcw.ap.gov.in',
        contactNumber: '1800-425-1111',
        startDate: new Date('2024-07-01'),
        isActive: true,
        districts: ['All Districts'],
        icon: '👩‍👦'
    },
    {
        name: 'Deepam 2.0',
        description: 'Free LPG gas cylinders for eligible households to support clean cooking.',
        category: 'Social Welfare',
        department: 'Civil Supplies',
        eligibilityCriteria: 'BPL households and eligible families',
        benefits: 'Free LPG cylinders (3 per year)',
        applicationProcess: 'Register through Civil Supplies portal',
        documentsRequired: ['Ration Card', 'Aadhaar Card', 'Income Certificate'],
        budgetAllocated: 200000000,
        budgetUtilized: 145000000,
        targetBeneficiaries: 800000,
        beneficiariesEnrolled: 620000,
        officialWebsite: 'https://civilsupplies.ap.gov.in',
        contactNumber: '1800-425-2222',
        startDate: new Date('2024-05-01'),
        isActive: true,
        districts: ['All Districts'],
        icon: '🔥'
    }
];

const sampleBudgets = [
    {
        year: '2025-26',
        department: 'Roads & Buildings',
        category: 'Infrastructure',
        projectName: 'NH-16 Widening Project',
        description: 'Widening of National Highway 16 from Visakhapatnam to Srikakulam',
        allocatedAmount: 1500000000,
        spentAmount: 450000000,
        district: 'Visakhapatnam',
        status: 'In Progress',
        priority: 'High',
        startDate: new Date('2025-01-15'),
        expectedEndDate: new Date('2026-12-31'),
        beneficiaries: 500000,
        physicalProgress: 30,
        financialProgress: 30,
        contractorName: 'ABC Infrastructure Ltd',
        contractorContact: '9999888877',
        isPublic: true
    },
    {
        year: '2025-26',
        department: 'Education',
        category: 'Education',
        projectName: 'Digital Classroom Initiative',
        description: 'Installation of smart boards and digital equipment in government schools',
        allocatedAmount: 500000000,
        spentAmount: 380000000,
        district: 'Guntur',
        status: 'In Progress',
        priority: 'High',
        startDate: new Date('2024-09-01'),
        expectedEndDate: new Date('2025-08-31'),
        beneficiaries: 200000,
        physicalProgress: 76,
        financialProgress: 76,
        contractorName: 'Tech Solutions Pvt Ltd',
        contractorContact: '9988776655',
        isPublic: true
    },
    {
        year: '2025-26',
        department: 'Health & Family Welfare',
        category: 'Health',
        projectName: 'Primary Health Center Upgrades',
        description: 'Modernization of 150 Primary Health Centers across the state',
        allocatedAmount: 750000000,
        spentAmount: 225000000,
        district: 'Kurnool',
        status: 'In Progress',
        priority: 'Critical',
        startDate: new Date('2025-02-01'),
        expectedEndDate: new Date('2026-01-31'),
        beneficiaries: 1000000,
        physicalProgress: 30,
        financialProgress: 30,
        contractorName: 'Healthcare Infrastructure Corp',
        contractorContact: '9876543210',
        isPublic: true
    }
];

// Seeder function
const seedDatabase = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Scheme.deleteMany({});
        await Budget.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Seed Users
        console.log('👥 Seeding users...');
        const users = await User.insertMany(sampleUsers);
        console.log(`✅ ${users.length} users created\n`);

        // Seed Schemes
        console.log('📋 Seeding schemes...');
        const schemes = await Scheme.insertMany(sampleSchemes);
        console.log(`✅ ${schemes.length} schemes created\n`);

        // Seed Budgets
        console.log('💰 Seeding budgets...');
        const budgets = await Budget.insertMany(sampleBudgets);
        console.log(`✅ ${budgets.length} budget entries created\n`);

        // Create initial analytics
        console.log('📊 Creating initial analytics...');
        const analytics = await Analytics.create({
            date: new Date(),
            type: 'daily',
            totalUsers: users.length,
            newUsers: users.length,
            activeUsers: 0,
            totalIssues: 0,
            newIssues: 0,
            pendingIssues: 0,
            inActionIssues: 0,
            resolvedIssues: 0,
            totalSchemes: schemes.length,
            activeSchemes: schemes.filter(s => s.isActive).length,
            totalBeneficiaries: schemes.reduce((sum, s) => sum + s.beneficiariesEnrolled, 0),
            totalBudgetAllocated: budgets.reduce((sum, b) => sum + b.allocatedAmount, 0),
            totalBudgetUtilized: budgets.reduce((sum, b) => sum + b.spentAmount, 0)
        });
        console.log('✅ Analytics created\n');

        console.log('🎉 Database seeded successfully!\n');
        console.log('📝 Summary:');
        console.log(`   Users: ${users.length}`);
        console.log(`   Schemes: ${schemes.length}`);
        console.log(`   Budgets: ${budgets.length}`);
        console.log('\n💡 Default Login Credentials:');
        console.log('   Admin:');
        console.log('   Email: admin@prajavaradhi.gov.in');
        console.log('   Password: admin123');
        console.log('\n   Citizen:');
        console.log('   Email: ramesh@example.com');
        console.log('   Password: user123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
