import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike, Calendar, CreditCard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import StatCard from "@/components/dashboard/stat-card";
import BikeTableRow from "@/components/dashboard/bike-table-row";
import PopularBike from "@/components/dashboard/popular-bike";
import RecentBooking from "@/components/dashboard/recent-booking";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Active Rentals"
            value="24"
            description="+12 from yesterday"
            icon={<Bike className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Total Customers"
            value="573"
            description="+201 since last year"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Pending Bookings"
            value="13"
            description="4 require attention"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[240px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                Revenue Chart Placeholder
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>You have 13 bookings this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RecentBooking
                  name="Alex Johnson"
                  bike="Yamaha MT-07"
                  time="2 hours ago"
                  status="active"
                />
                <RecentBooking
                  name="Sarah Williams"
                  bike="Honda CBR650R"
                  time="5 hours ago"
                  status="active"
                />
                <RecentBooking
                  name="Michael Brown"
                  bike="Kawasaki Z900"
                  time="Yesterday"
                  status="completed"
                />
                <RecentBooking
                  name="Emily Davis"
                  bike="Ducati Monster"
                  time="Yesterday"
                  status="cancelled"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Popular Motorcycles</CardTitle>
              <CardDescription>Most rented bikes this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PopularBike
                  name="Yamaha MT-07"
                  rentals={42}
                  availability="6/8 available"
                  trend="up"
                />
                <PopularBike
                  name="Honda CBR650R"
                  rentals={38}
                  availability="3/5 available"
                  trend="up"
                />
                <PopularBike
                  name="Kawasaki Z900"
                  rentals={29}
                  availability="2/4 available"
                  trend="down"
                />
                <PopularBike
                  name="Ducati Monster"
                  rentals={24}
                  availability="1/2 available"
                  trend="up"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Manage your motorcycle fleet</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Motorcycle
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Status
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Condition
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <BikeTableRow
                          name="Yamaha MT-07"
                          status="available"
                          condition="Excellent"
                        />
                        <BikeTableRow
                          name="Honda CBR650R"
                          status="rented"
                          condition="Good"
                        />
                        <BikeTableRow
                          name="Kawasaki Z900"
                          status="maintenance"
                          condition="Fair"
                        />
                        <BikeTableRow
                          name="Ducati Monster"
                          status="available"
                          condition="Excellent"
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
