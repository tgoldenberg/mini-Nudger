if (Organizations.find().count() === 0) {
  Organizations.insert({
    name: "Nudger",
    city: "New York City",
    state: "NY",
    country: "United States"
  });

  Organizations.insert({
    name: "Facebook",
    city: "Menlo Park",
    state: "CA",
    country: "United States"
  });

  Organizations.insert({
    name: "Kaplan",
    city: "Fort Lauderdale",
    state: "FL",
    country: "United States"
  });
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
})
