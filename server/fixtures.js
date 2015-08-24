var organizationsData = [
  {
    name: "Nudger",
    city: "New York City",
    state: "NY",
    country: "United States"
  },
  {
    name: "Facebook",
    city: "Menlo Park",
    state: "CA",
    country: "United States"
  },
  {
    name: "Kaplan",
    city: "Fort Lauderdale",
    state: "FL",
    country: "United States"
  }
]

if (Organizations.find().count() === 0) {
  seedOrganizations(organizationsData);
}

var taskData = [
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "assigned",
    importance: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "assigned",
    importance: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "assigned",
    importance: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "completed",
    importance: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "completed",
    importance: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "completed",
    importance: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  },
  {
    title: faker.commerce.productName(),
    summary: faker.commerce.product(),
    assigneeId: null,
    assignorId: null,
    status: "pending",
    importance: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: Organizations.findOne()._id
  }
]


if (Tasks.find().count() === 0) {
  seedTasks(taskData);
}
if (Meteor.users.find().count() === 0) {
  seedUsers();
}

function seedTasks(taskData) {
  taskData.forEach(function(task) {
    Tasks.insert({
      title: task.title,
      summary: task.summary,
      assigneeId: null,
      assignorId: null,
      status: task.status,
      importance: task.importance,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      organizationId: task.organizationId
    });
  });
}

function seedOrganizations(organizationsData) {
  organizationsData.forEach(function(organization) {
    Organizations.insert({
      name: organization.name,
      city: organization.city,
      state: organization.state,
      country: organization.country
    })
  });
}

function seedUsers() {
  for (i=0; i<20; i++) {
    var user = usersData();
    Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        position: user.position,
        assignee: user.assignee,
        assignor: user.assignor,
        organizationId: user.organizationId,
        updatedAt: user.updatedAt
      },
      createdAt: user.createdAt
    });
  }
}

function randomBool() {
  return Math.random()<.5;
}

function usersData() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    position: faker.commerce.department(),
    assignee: randomBool(),
    assignor: randomBool(),
    organizationId: Organizations.findOne()._id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}
