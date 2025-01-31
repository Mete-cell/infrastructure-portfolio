module "vpc" {
  source = "../../modules/vpc"
  
  environment = "dev"
  vpc_cidr    = "10.0.0.0/16"
}

module "eks" {
  source = "../../modules/eks"

  environment = "dev"
  vpc_id      = module.vpc.vpc_id
  subnet_ids  = module.vpc.public_subnet_ids
}