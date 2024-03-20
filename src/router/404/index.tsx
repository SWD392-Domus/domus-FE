import { Button } from "@/components/ui/Button/Button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // This will navigate to the previous page
      };
    
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">404</CardTitle>
          <CardDescription>
            The page you’re looking for doesn’t exist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={goBack}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}