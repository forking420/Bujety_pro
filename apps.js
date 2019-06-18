
// Module 1
var budgetControll = (function (){

//   var x = 25;

//   var add = function(a){
//     return x + a;
//   }

//   return {
//       publicTest: function(b){
//           console.log(add(b));
//       }
//   }

// This function construction will keeps track all expenses

var Expns = function(id, description, values){
    this.id = id;
    this.description = description;
    this.values = values;
};

// This function construction will keeps track all incomes

var Incoms = function(id, description, values){
    this.id = id;
    this.description = description;
    this.values = values;
};
// Totals calculations
var calTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(curr){
        sum += curr.values;
    });

    data.totals[type] = sum;
};
// This data srtucture recive and store data from construct function
/**
 * var data = {
    allItems:{
        exp : [],
        inc : []
        
    },
    totals:{
        exp: 0,
        inc: 0
    },
    budget: 0,
    persentage: -1,
  
}
 */
var data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

return {
    addItem: function (type, des, val){
        var newItem, ID;

        // Create new ID
        if(data.allItems[type].length>  0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }else{
            ID = 0;
        }

        // Create new item based on 'inc' or 'exp' type
        if(type === 'exp'){
            newItem = new Expns(ID, des, val);
        }
        else if(type === 'inc'){
            newItem = new Incoms(ID, des, val);
        }

        data.allItems[type].push(newItem);
        return newItem;
    },
    deleteItem: function(type, id) {
        var ids, index;
        
        // id = 6
        //data.allItems[type][id];
        // ids = [1 2 4  8]
        //index = 3
        
        ids = data.allItems[type].map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
        
},
    
    calcBudget:function(){
        //calculate total income and expenses
         calTotal('exp');
         calTotal('inc');
        
        //  calculate the bugdet: income - expenses
        data.budget = data.totals.inc - data.totals.exp;

        // Calculate percentage
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    /**
     * 
     * deleteItem: function(type, id){
     
        var ids, index;
        ids = data.allItems['exp', 'inc'].map(function(current){
            return current.id;
        });

        index = ids.indexOf(id);
        

        if (index !== -1){
            data.allItems['exp', 'inc'].splice(index, 1);
      }
    },
     
     */
   
    getBudget:function(){

        return{
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percent: data.percentage
        };
    },
    
// This for test purpose
tesObject:function(){
    console.log(data);
}

};

}) ();


// Module 2
var UIController = (function(){
// HTML classes take in object so that int can changed later if needed
    var DOMstrigs = {
        intType: '.add__type',
        desCrip: '.add__description',
        val:'.add__value',
        btn: '.add__btn',
        incomConteiner: '.income__list',
        expensConteiner: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensLabel: '.budget__expenses--value',
        percentLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    // Closure that returns defferent type of property 
    return {
        getInput: function(){
            return{
                type : document.querySelector(DOMstrigs.intType).value, //Either exp or income
                description : document.querySelector(DOMstrigs.desCrip).value,
                value : parseFloat(document.querySelector(DOMstrigs.val).value)
            }
 
        },
// Create HTML string with placehoder text
addListItem: function(obj, type){
    var html, newHtml, element;

    if(type === 'inc'){
        element = DOMstrigs.incomConteiner;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%values%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
    }
    else if(type === 'exp'){
        element = DOMstrigs.expensConteiner;
        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%values%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
    }

    // Replace the placeholder text with some actual date
    newHtml = html.replace('%d%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%values%', obj.values);

// Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
},

 deleteListItem: function(selectorID){

 var ele = document.getElementById(selectorID);

 ele.parentNode.removeChild(ele);

},

clearFix: function(){
    var fields, fieldArr; 
    // Select html fields by querySelectorAll method
   fields = document.querySelectorAll(DOMstrigs.desCrip + ', ' + DOMstrigs.val);

//  Using default array constracutor for sliced all the selected field by call()

   fieldArr = Array.prototype.slice.call(fields);

// for selecting every field and clearing valuess by this looping function
   fieldArr.forEach(function(current, index, array){
       current.value = "";
   });

//  After inserting field cursor will remain in description field
   fieldArr[0].focus();
},

displayBudget:function(obj){
  document.querySelector(DOMstrigs.budgetLabel).textContent = obj.budget;
  document.querySelector(DOMstrigs.incomeLabel).textContent = obj.totalInc;
  document.querySelector(DOMstrigs.expensLabel).textContent = obj.totalExp;

  if(obj.percent > 0){
    document.querySelector(DOMstrigs.percentLabel).textContent = obj.percent + '%';
  }else{
    document.querySelector(DOMstrigs.percentLabel).textContent = '--';
  }
  
},
// This object returns DOMstrigs object for public uses...
        getDOMstrings:function(){
            return DOMstrigs;
        }

    }
})();



// Module 3
var contRoll = (function(budgetCtrl, UICtrl){

    var sertupEventListeners = function(){

    // Received the getDOMstrings functions......
    var DOM = UICtrl.getDOMstrings();
// >> 1. when click add button (ctrlAddItem) function will happen
    document.querySelector(DOM.btn).addEventListener('click', ctrlAddItem);

    // >> 2. when hit Enter button then also (ctrlAddItem) function will happen
    document.addEventListener('keypress', function(events){
    
        if(events.keyCode === 13 || events.which === 13){
            // console.log('ENTER key pressed');
            ctrlAddItem();
        }
    });

    // Event delegation 

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    var UpdateBudgetCtrl = function() {
        // 1. Calculate the budget
    budgetControll.calcBudget();
        // 2. return the budget
    var budgets = budgetControll.getBudget();
        // 3. Display the budget on the UI
        UIController.displayBudget(budgets);
        
    };


    // var z = budgetCtrl.publicTest(12);

    // return {
    //     anoTher : function(){
    //         console.log(z);
    //     }
    // }

// This variable hold the function for Don't Repeat Your Code purpose 
// So this variable use again and again in defferent section
    var ctrlAddItem = function(){
        var inPut, newItem;

    // 1. Get the file input data
    inPut = UICtrl.getInput();

    if(inPut.description !=="" && !isNaN(inPut.value) && inPut.value>0){
      
    // 2. Add the item to the budget controller
    newItem = budgetControll .addItem(inPut.type, inPut.description, inPut.value);
    // 3. Add the item to the UI
    UIController.addListItem(newItem, inPut.type);

    //  4. Clear all fields
    UIController.clearFix();

    // 5. Calculate & Update Budget
    UpdateBudgetCtrl();


    }


    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
             
            // 1. Delete the item from the data structure
            budgetControll.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UIController.deleteListItem(itemID);

            // 3. Update and show the new budget

            UpdateBudgetCtrl();
             
        }
    };

return {

    init:function(){
        console.log('Apps Started..');
        UIController.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percent: -1
        });
        sertupEventListeners();
    }
};

})(budgetControll, UIController);

contRoll.init();