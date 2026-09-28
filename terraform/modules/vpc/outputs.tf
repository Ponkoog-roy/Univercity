output "aws_vpc_id" {
    description = "ID of the VPC"
    value       = aws_vpc.terraform_vpc.id
}

output "public_subnet_id" {
    description = "ID of the Public Subnet"
    value       = aws_subnet.public_subnet[0].id

}

output "aws_private_subnet_id" {
    description = "ID of the Private Subnet"
    value       = aws_subnet.private_subnet[0].id
}


output "aws_internet_gateway_id" {
    description = "ID of the Internet Gateway"
    value       = aws_internet_gateway.terraform_igw.id
}

output "aws_nat_gatway_ip" {
    description = "IP of the NAT Gateway"
    value       = aws_nat_gateway.nat_gw.public_ip
}

