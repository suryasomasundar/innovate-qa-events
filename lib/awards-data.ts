import awardsData from "@/data/awards-2027.json"
import { validateAwardsEdition, type AwardsEdition } from "@/lib/awards"

export const awards2027: AwardsEdition = awardsData
validateAwardsEdition(awards2027)
