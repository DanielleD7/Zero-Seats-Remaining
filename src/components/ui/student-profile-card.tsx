import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { X, GraduationCap, BookOpen } from "lucide-react"
import React from "react"
import AwesomeAlert from 'react-native-awesome-alerts';

type StudentProfileProps = {
  name: string
  studentId: string
  classLevel: string
  programOfStudy: string
  avatarUrl: string
}

export default class StudentProfileCard extends React.Component<StudentProfileProps>{
  constructor(props: StudentProfileProps) {
    super(props);
    this.state = { 
      showAlert: false, 
    };
  }
  showAlert = () => {
    this.setState({showAlert: true})
  }
  hideAlert = () => {
    this.setState({showAlert: false})
  }
  render() {
    return (
      <Card className="bg-white text-gray-800">
            {/* <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Student Profile</CardTitle>
            </CardHeader> */}
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={this.props.avatarUrl} alt={this.props.name} />
                  {/* <AvatarFallback>{this.props.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback> */}
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{this.props.name}</h2>
                  <p className="text-gray-600">Student ID: {this.props.studentId}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-600" />
                  <div>
                    <p className="font-semibold">Class Level</p>
                    <p className="text-gray-600">{this.props.classLevel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
                  <div>
                    <p className="font-semibold">Program of Study</p>
                    <p className="text-gray-600">{this.props.programOfStudy}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    )
  }
}