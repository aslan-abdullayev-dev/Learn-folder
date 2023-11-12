import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";


type FormProps = {
  firstName: null | string;
  lastName: null | string;
  jobDetails: {
    salary: null | number;
    position: null | string;
    resposibilities: string[];
  };
};

function Basics() {
  const UseFormReturn = useForm<FormProps>({
    defaultValues: {
      firstName: null,
      lastName: null,
      jobDetails: {
        salary: null,
        position: null,
        resposibilities: [],
      },
    },
  });

  const { register, watch, handleSubmit, setValue, reset, control, formState, unregister } = UseFormReturn;

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      console.log('data', data);
    })();
  };

  // const responsibilitiesArr = watch('jobDetails.resposibilities');
  // console.log("responsibilitiesArr ==>", responsibilitiesArr);
  console.log(watch());

  // reset({
  //   firstName: null,
  //   lastName: null,
  // })
  // unregister("jobDetails")

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Personal Info</h2>
        <input type="text" placeholder="First Name" {...register('firstName', { shouldUnregister: false })} />
        <input type="text" placeholder="Last Name" {...register('lastName')} />
        <h2>Job Info</h2>
        <input
          type="text"
          placeholder="Job Position"
          {...register('jobDetails.position')}
        />
        <input
          type="number"
          placeholder="Salary"
          {...register('jobDetails.salary', { valueAsNumber: true })}
        />
        <h2>Responsibilities</h2>
        <input
          type="text"
          placeholder="First"
          {...register('jobDetails.resposibilities.0')}
        />
        <input
          type="text"
          placeholder="Second"
          {...register('jobDetails.resposibilities.1', { required: true })}
        />
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </>
  );
}

export default Basics