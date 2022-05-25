QBCore = exports['qb-core']:GetCoreObject()

function getSocietyMoney()
    return exports['qb-management']:GetAccount('cookies')
end

function addSocietyMoney(money)
	exports['qb-management']:AddMoney("cookies", money)
end

function removeSocietyMoney(money)
	exports['qb-management']:RemoveMoney("cookies", money)
end

function CanCarryItem(id, item, amount)
	local xPlayer = QBCore.Functions.GetPlayer(id)
	local totalWeight = QBCore.Player.GetTotalWeight(xPlayer.PlayerData.items)
	local itemInfo = QBCore.Shared.Items[item:lower()]
	if (totalWeight + (itemInfo['weight'] * amount)) <= QBCore.Config.Player.MaxWeight then
		return true
	else
		return false
	end
end

function GetItemLabel(item)
	return QBCore.Shared.Items[item].label
end

function GetPlayerFromId(id)
	return QBCore.Functions.GetPlayer(id).Functions
end

function getMoney(id)
	local xPlayer = QBCore.Functions.GetPlayer(id)
	return xPlayer.PlayerData.money['cash']
end