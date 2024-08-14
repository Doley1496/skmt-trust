/* */

/* Creating a class with name ApiFeatures and inside the class we are creating : */

/* ************************************** */
/* 1. 1st we are creating a constructor.  */

/* 1st creating a constructor which will take two parameter's then using this operator 
   we are assigning their values (parameter's value) to their same parameter's.
     
      The 1st parameter will be a mongoose method.
      The 2nd parameter will be the keyword(query) we want to pass in the url.

        Ex:   ApiFeatures(productModel.find(), req.query);
*/

/* ******************************************************************************* */
/* 2. 2nd we are creating a search() function to search products in our database.  */

/*  
    1. 1st using ternary operator we will check the keyword that the user is searching 
       available in our database or not.
       If present then we will return those products whose matches with the pattern of 
       the search keyword.

         And we will do that using mongoose method $regex = regular expression
         and options="i" means case in-sensitive ie.. no-matter in which case upper-case 
         or lower-case the user types the user will get its results if pattern matches.

    2. 2nd we will update(change) the 1st paramter ( ie.. this.query ) by applying find() function 
       in it and for the find() function we will pass the existing value present in keyword which 
       contains the search results.
          ie... this.query = this.query.find({ ...keyword }); 

      * this.query is exactly equal to productModel.find()
   
    3. 3rd we will return this.

*/

/* *********************************************************************** */
/* 3. 3rd we are creating filter() function for category, price, ratings.  */

/*                  

    ** 1st we will make a copy(reference) of queryString so that our main queryString
       doesn't gets affected.


    ** 2nd filtering for category:
        
       * Remove some fields for category so that we will not search this fields in
         our database although user search.  ie.. 

           * keyword = we will remove keyword because in the keyword parameter we are receiving 
                       the value that needs to be search.    
                    Ex: keyword = iphone.

                 here: keyword = parameter and iphone = value.
            
           * page =  we will remove page because in the page parameter we are receiving the 
                     value of the currentPage number.
                   Ex: page = 5

           * limit = we will remove limit we will provide the limit ie.. how many products
                     should we display.
  
       * Then using forEach() method we will loop in the removeFields array and passing all its 
         values to the keys parameter and deleting all the keys from the queryCopy variable where 
         we have store the reference(copy) of queryString values.



    ** 3rd filtering for price:

         = In mongoDb we have to use $ symbol before an expression therefore we will use a $ symbol
           before queryCopy. So to replace
    
       * 1st we will convert the queryCopy which is an object into string and store it in a variable 
         say queryString. 
    
       * 2nd we will provide a $ symbol in front of all the expressions of queryCopy that we have
         stored in queryString.    
         ie.. gt, gte, lt, lte using replace() method. 

       * 3rd we will again convert the queryString variable where we stored the replace value into object.


    ** 4th we will update(change) the 1st paramter ( ie.. this.query ) by applying find() function 
       in it and for the find() function we will pass the queryObject variable which contains all 
       the expression's with $ sign infront of it in object form.

          ie... this.query = this.query.find(queryObject);

        * this.query is exactly equal to productModel.find()
     

    ** 5th return this;
    
*/

/* ***************************************************************************** */
/* 4. 4th we are creating pagination() function to display the products per-page */

/*  1. 1st we will find the currentPage and we will get the current-page from the query. 

       If we will get the current-page then we will provide that current page. 
       Otherwise we will give its value as 1. 

    2. 2nd we will find the number of products we want to skip according to the page by 
       using a simple formula. 

       Ex: 
        when the user will be at page 1 then we will skip 0 products,
        when the user will be at page 2 then we will skip first 10 products,
        when the user will be at page 3 then we will skip first 20 products and so on upto 
        the last page.

        We will skip from the front side.
    
    3. 3rd we will update(change) the 1st paramter ( ie.. this.query ) by applying limit() function 
       and skip() function in it and for the limit function we will pass the resultPerPage value as 
       the limit's value and for the skip function we will pass the skip value as the skip's value.

      * this.query is exactly equal to productModel.find()
   
    4. 4th we will return this.

*/

class ApiFeatures {
  /* */

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    /* */

    const keyword = this.queryString.keyword
      ? {
          name: { $regex: this.queryString.keyword, $options: "i" },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;

    /* */
  }

  // filter() {
  //   /* */

  //   const queryCopy = { ...this.queryString };

  //   /* Category */

  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((keys) => delete queryCopy[keys]);

  //   /* Price */

  //   let queryString = JSON.stringify(queryCopy);

  //   queryString = queryString.replace(
  //     /\b(gt|gte|lt|lte)\b/g,
  //     (keys) => `$${keys}`
  //   );

  //   // let queryObject = JSON.parse(queryString);

  //   this.query = this.query.find(JSON.parse(queryString));

  //   return this;

  //   /* */
  // }

  pagination(resultPerPage) {
    /* */

    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;

    /* */
  }

  /* */
}

export default ApiFeatures;
