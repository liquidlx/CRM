## Description
This doc refers to the tests. Every test on the project is described here, the input and output for each one.

## Service tests

### 'should create a user'

input:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "password_test"
    }
```

output:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
        createdAt: Date,
        updatedAt: Date
    }
```

### 'should update a user'

input:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "password_test"
    }
```

output:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
        createdAt: Date,
        updatedAt: Date
    }
```

### 'should delete a user'

input:
 ```javascript
    "2fe037a7-d70c-4fb3-b94f-318b138cf5c6"
```

output:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
        createdAt: Date,
        updatedAt: Date
    }
```

### 'should find user by id'

input:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6"
    }
```

output:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
        createdAt: Date,
        updatedAt: Date
    }
```

### 'should not find user by id'

input:
 ```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6"
    }
```

output:
 ```javascript
    null
```

### 'should find all users'

input: none

output:
 ```javascript
    [
        {
            id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
            name: "John Doe",
            email: "johndoe@test.com",
            password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
            createdAt: Date,
            updatedAt: Date
        },
        {
            id: "3ab13737-d70c-4fb3-b94f-318b138cff10",
            name: "John Doe",
            email: "johndoe@test.com",
            password: "$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK",
            createdAt: Date,
            updatedAt: Date
        }
    ]
```

### 'should not find all users'

input: none

output:
 ```javascript
    []
```

## Controller

the input and output for controller is the same. Update the docs if modify it.

## e2e test for users.

### 'should create user via POST'

body request: 
```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "password_test"
    }
```

tests:
- response.body.id should match
- response.body.name should match
- response.body.email should match
- dates are not tested because always comes different
- response code should be 201

### 'should update user via POST'

body request: 
```javascript
    {
        id: "2fe037a7-d70c-4fb3-b94f-318b138cf5c6",
        name: "John Doe",
        email: "johndoe@test.com",
        password: "password_test"
    }
```

tests:
- response.body.id should match
- response.body.name should match
- response.body.email should match
- dates are not tested because always comes different
- response code should be 200

### 'should GET user by id'

body request: none
url param: ```"2fe037a7-d70c-4fb3-b94f-318b138cf5c6"```

tests:
- response.body.id should match
- response.body.name should match
- response.body.email should match
- dates are not tested because always comes different
- response code should be 200

### 'should GET all users'

body request: none 

tests:
- response code should be 200

### 'should DELETE a user'

body request: none 
url param: ```"2fe037a7-d70c-4fb3-b94f-318b138cf5c6"```

tests:
- response code should be 204