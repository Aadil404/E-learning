import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";


const Login = () => {
    //for storing states of login and signup input
    const [loginInput, setLoginInput] = useState({email: "", password: ""});
    const [signupInput, setSignupInput] = useState({name: "", email: "", password: ""});


    //will handle input of data in login and signup cards and store them in state
    const changeInputHandler = (e, type) => {
        if (type === "login") {
            setLoginInput({...loginInput, [e.target.name]: e.target.value});
        } else {
            setSignupInput({...signupInput, [e.target.name]: e.target.value});
        }
    }


    //when user click submit button for login or signup this function will be called 
    const handleRegistration = (type) => {
        const inputData = type === "login" ? loginInput : signupInput;
        console.log(inputData);
    }

  return (
    //this is a builtin tabs component of shadcnUI and i customize it as required
    <div className="flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">    
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
    
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. adil@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                type="password" 
                name="password" 
                value={loginInput.password} 
                onChange={(e) => changeInputHandler(e, "login")}
                required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {handleRegistration("login")}} >Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                type="text" 
                name="name"
                value={signupInput.name}
                onChange={(e) => changeInputHandler(e, "signup")}
                placeholder="Eg. Adil" 
                required={true} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. adil@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                type="password" 
                name="password"
                value={signupInput.password}
                onChange={(e) => changeInputHandler(e, "signup")}
                required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {handleRegistration("signup")}} >Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
