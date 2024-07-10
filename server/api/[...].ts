// import
import employeeModel from "../plugins/models/employee.model";
const router = createRouter();

// =============================
// Get All Employees from Db
// =============================
router.get(
  "/home",
  defineEventHandler(async (Event) => {
    const employees = await employeeModel.find({});
    return { employees };
  })
);

// =============================
// find  Employee By Id from Db
// =============================
router.get(
  "/home/:id",
  defineEventHandler(async (Event) => {
    const  {id}  = await getRouterParams(Event);
    const employees = await employeeModel.findOne({_id :id});
    return { employees };
  })
);

// =============================
// Post(create) new Employee to Db
// =============================
router.post(
  "/home",
  defineEventHandler(async (Event) => {
    const { name, email, salary, birthdate, status } = await readBody(Event);
     
    try{
        // create
         await employeeModel.create({
            name,
            email,
            salary,
            birthdate,
            status,
          });
          

    }catch(err){
         console.log(err)
    }
     
    return "employee created";
  })
);

// =============================
// put(update) Employee from Db
// =============================
router.put(
    "/home/:id",
    defineEventHandler(async (Event) => {

      try{
        const { name, email, salary, birthdate, status } = await readBody(Event);
        const  {id}  = await getRouterParams(Event);
          
        // update
           await employeeModel.findByIdAndUpdate({_id:id},{
            name,
            email,
            salary,
            birthdate,
            status,
          })
        
      }
      catch(err:any){
        console.log(err.message)
      }
      
      return 'updated';
    })
  );

// =============================
// put(delete) Employee from Db
// =============================
router.delete(
    "/home/:id",
    defineEventHandler(async (Event) => {

      try{
        const { id }  = await getRouterParams(Event);
          
        // update
           await employeeModel.findByIdAndDelete({_id:id})
        
      }
      catch(err:any){
        console.log(err.message)
      }
      
      return 'deleted';
    })
  );

export default useBase("/api/", router.handler);
