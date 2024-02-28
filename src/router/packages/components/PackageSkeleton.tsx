import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from '@/components/ui/Skeleton';


const PackageSkeleton = () => {
  return (
    <div>
      <Card className="w-[auto] h-[auto]">
        <CardHeader className="w-full ">
          <div className='w-full'>
            <Skeleton className="md:px-20 px-28 py-36  flex justify-center rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="">
          <CardTitle className="pb-2">
            <Skeleton className='w-28 h-4' />
          </CardTitle>
          <CardDescription className="pb-4">
            <Skeleton className='w-full h-4' />
          </CardDescription>
          <CardTitle>
            <Skeleton className='w-20 h-4' />
          </CardTitle>
        </CardContent>
        <CardFooter className="">
          <Skeleton className='w-10 h-10 rounded-full' />
        </CardFooter>
      </Card>
    </div>
  )
}

export default PackageSkeleton