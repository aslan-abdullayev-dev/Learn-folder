//* Discriminatory union based on literal values / different field names
type Person = {
  name: string;
  age: number;
  occupancyDetails: EmployedPerson | UnemployedPerson;
};

type EmployedPerson = {
  jobName?: string;
  salary?: number;
  isWorking: true;
};

type UnemployedPerson = {
  isWorking: false;
};

const printmyData = (data: Person) => {
  if (data.occupancyDetails.isWorking) {
    data.occupancyDetails.jobName = "das";
  } else {
    data.occupancyDetails.isWorking = false;
  }
};

//* Discriminatory union based on ts types
type DiscriminatoryType = Data & (Age1 | Age2);
type Data = {
  name: string;
};

type Age1 = {
  age: number;
  address: string;
};

type Age2 = {
  age: string;
  work: string;
};

const printmyData2 = (data: DiscriminatoryType) => {
  if (typeof data.age === "string") {
    data.work
    // data.data.extensions;
  } else {
    // data.data.max;
  }

  if(data.work) {
    // data.
  }
};